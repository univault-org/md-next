---
title: "TanStack Query Architecture Deep Dive - Part 2: Advanced Patterns"
description: "Advanced patterns including request deduplication, optimistic updates, and building your own query system"
author: "PAI Research Team"
date: "2024-01-15"
difficulty: "Advanced"
learning_objectives:
  - "Master request deduplication and caching strategies"
  - "Implement optimistic updates with rollback mechanisms"
  - "Build custom query management systems"
  - "Apply TanStack Query patterns without the library"
tags: ["javascript", "react", "tanstack-query", "advanced-patterns", "optimization"]
slug: "tanstack-query-architecture-deep-dive-part2"
---

# TanStack Query Advanced Patterns: Building Production-Ready Systems

*This is Part 2 of our TanStack Query deep dive. [Read Part 1](/paiTraining/Programming_Language/JavaScript_Node/tanstack-query-architecture-deep-dive) for the foundational patterns.*

## Request Deduplication: Preventing Redundant Network Calls

One of TanStack Query's most valuable features is its ability to deduplicate identical requests. When multiple components request the same data simultaneously, only one network request is made, and all components receive the same result. This seemingly simple feature requires sophisticated coordination.

### The Deduplication Challenge

Consider this scenario: A user navigates to a product page that contains multiple components, each needing the same product data:

```javascript
// Multiple components making the same request
const ProductHeader = ({ productId }) => {
  const { data: product } = useQuery(['product', productId], fetchProduct);
  return <h1>{product?.name}</h1>;
};

const ProductPrice = ({ productId }) => {
  const { data: product } = useQuery(['product', productId], fetchProduct);
  return <span>${product?.price}</span>;
};

const ProductDescription = ({ productId }) => {
  const { data: product } = useQuery(['product', productId], fetchProduct);
  return <p>{product?.description}</p>;
};
```

Without deduplication, this would trigger three identical API calls. TanStack Query solves this through a sophisticated promise-sharing mechanism:

```javascript
// Request Deduplication Implementation
class QueryClient {
  constructor() {
    this.cache = new QueryCache();
    this.mutationCache = new MutationCache();
    this.queryDeduplication = new Map(); // queryHash -> Promise
  }

  async fetchQuery(options) {
    const queryHash = this.generateQueryHash(options.queryKey);
    
    // Check if this exact query is already in flight
    if (this.queryDeduplication.has(queryHash)) {
      return this.queryDeduplication.get(queryHash);
    }

    // Create the fetch promise
    const fetchPromise = this.executeFetchQuery(options)
      .finally(() => {
        // Clean up the deduplication entry when complete
        this.queryDeduplication.delete(queryHash);
      });

    // Store the promise for deduplication
    this.queryDeduplication.set(queryHash, fetchPromise);
    
    return fetchPromise;
  }

  async executeFetchQuery(options) {
    const query = this.cache.get(
      this.generateQueryHash(options.queryKey),
      options.queryKey,
      options
    );

    return query.fetch(options);
  }

  generateQueryHash(queryKey) {
    // Generate a stable hash from the query key
    return JSON.stringify(queryKey, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Sort object keys for consistent hashing
        return Object.keys(value)
          .sort()
          .reduce((sorted, key) => {
            sorted[key] = value[key];
            return sorted;
          }, {});
      }
      return value;
    });
  }
}
```

### Advanced Deduplication with Context Awareness

Real-world applications often need more nuanced deduplication strategies. Consider authentication contexts or user-specific data:

```javascript
// Context-Aware Deduplication
class ContextAwareQueryClient extends QueryClient {
  constructor() {
    super();
    this.contextualDeduplication = new Map(); // contextHash -> Map<queryHash, Promise>
  }

  async fetchQuery(options, context = {}) {
    const contextHash = this.generateContextHash(context);
    const queryHash = this.generateQueryHash(options.queryKey);
    
    // Get or create context-specific deduplication map
    if (!this.contextualDeduplication.has(contextHash)) {
      this.contextualDeduplication.set(contextHash, new Map());
    }
    
    const contextQueries = this.contextualDeduplication.get(contextHash);
    
    // Check for existing request in this context
    if (contextQueries.has(queryHash)) {
      return contextQueries.get(queryHash);
    }

    // Create new request with context
    const fetchPromise = this.executeFetchQueryWithContext(options, context)
      .finally(() => {
        contextQueries.delete(queryHash);
        
        // Clean up empty context maps
        if (contextQueries.size === 0) {
          this.contextualDeduplication.delete(contextHash);
        }
      });

    contextQueries.set(queryHash, fetchPromise);
    return fetchPromise;
  }

  generateContextHash(context) {
    const { userId, orgId, permissions } = context;
    return `user:${userId}-org:${orgId}-perms:${JSON.stringify(permissions)}`;
  }
}
```

## Optimistic Updates: The Art of Perceived Performance

Optimistic updates provide immediate feedback to users by updating the UI before the server confirms the change. This pattern dramatically improves perceived performance but requires careful error handling and rollback mechanisms.

### Basic Optimistic Update Pattern

```javascript
// Optimistic Update Implementation
const useOptimisticMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    
    // Before mutation: apply optimistic update
    onMutate: async (variables) => {
      const { optimisticUpdate, queryKey } = options;
      
      if (!optimisticUpdate || !queryKey) return {};

      // Cancel outgoing refetches to avoid conflicts
      await queryClient.cancelQueries(queryKey);

      // Snapshot current data for rollback
      const previousData = queryClient.getQueryData(queryKey);

      // Apply optimistic update
      queryClient.setQueryData(queryKey, (oldData) => 
        optimisticUpdate(oldData, variables)
      );

      // Return context for rollback
      return { previousData, queryKey };
    },

    // On error: rollback optimistic update
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
      
      // Show error notification
      options.onError?.(error, variables, context);
    },

    // On success: invalidate and refetch
    onSuccess: (data, variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries(context.queryKey);
      }
      
      options.onSuccess?.(data, variables, context);
    }
  });
};

// Usage Example
const useUpdatePost = () => {
  return useOptimisticMutation(
    updatePost,
    {
      queryKey: ['posts'],
      optimisticUpdate: (posts, { id, updates }) => 
        posts?.map(post => 
          post.id === id ? { ...post, ...updates } : post
        ),
      onError: (error) => {
        toast.error('Failed to update post: ' + error.message);
      }
    }
  );
};
```

### Advanced Optimistic Updates with Conflict Resolution

Real applications often deal with concurrent updates from multiple sources. TanStack Query provides sophisticated patterns for handling these conflicts:

```javascript
// Advanced Optimistic Update with Conflict Resolution
class OptimisticUpdateManager {
  constructor(queryClient) {
    this.queryClient = queryClient;
    this.pendingUpdates = new Map(); // queryKey -> Set<updateId>
    this.updateHistory = new Map(); // updateId -> UpdateRecord
  }

  async executeOptimisticUpdate({
    queryKey,
    mutationFn,
    optimisticUpdate,
    conflictResolution = 'lastWins'
  }) {
    const updateId = this.generateUpdateId();
    
    // Track this update
    this.trackUpdate(queryKey, updateId);

    try {
      // Apply optimistic update
      const previousData = await this.applyOptimisticUpdate(
        queryKey,
        optimisticUpdate,
        updateId
      );

      // Execute actual mutation
      const result = await mutationFn();

      // Handle successful completion
      this.completeUpdate(updateId, result);
      return result;

    } catch (error) {
      // Handle rollback with conflict resolution
      await this.rollbackUpdate(updateId, conflictResolution);
      throw error;
    }
  }

  async applyOptimisticUpdate(queryKey, optimisticUpdate, updateId) {
    // Cancel conflicting queries
    await this.queryClient.cancelQueries(queryKey);

    // Get current data
    const currentData = this.queryClient.getQueryData(queryKey);
    
    // Store update record
    this.updateHistory.set(updateId, {
      queryKey,
      previousData: currentData,
      timestamp: Date.now(),
      status: 'pending'
    });

    // Apply optimistic update
    const newData = optimisticUpdate(currentData);
    this.queryClient.setQueryData(queryKey, newData);

    return currentData;
  }

  async rollbackUpdate(updateId, conflictResolution) {
    const updateRecord = this.updateHistory.get(updateId);
    if (!updateRecord) return;

    const { queryKey, previousData } = updateRecord;
    
    // Get pending updates for this query
    const pendingUpdates = Array.from(this.pendingUpdates.get(queryKey) || [])
      .map(id => this.updateHistory.get(id))
      .filter(record => record?.status === 'pending')
      .sort((a, b) => a.timestamp - b.timestamp);

    // Apply conflict resolution strategy
    switch (conflictResolution) {
      case 'lastWins':
        // Keep only the most recent optimistic update
        this.queryClient.setQueryData(queryKey, 
          pendingUpdates.length > 1 
            ? this.reapplyUpdates(previousData, pendingUpdates.slice(-1))
            : previousData
        );
        break;

      case 'merge':
        // Attempt to merge all pending updates
        this.queryClient.setQueryData(queryKey,
          this.mergeUpdates(previousData, pendingUpdates)
        );
        break;

      case 'revert':
        // Revert to original data and refetch
        this.queryClient.setQueryData(queryKey, previousData);
        await this.queryClient.invalidateQueries(queryKey);
        break;
    }

    // Mark update as failed
    updateRecord.status = 'failed';
    this.untrackUpdate(queryKey, updateId);
  }

  mergeUpdates(baseData, updates) {
    return updates.reduce((data, update) => {
      try {
        return update.optimisticUpdate(data);
      } catch (error) {
        console.warn('Failed to apply optimistic update during merge:', error);
        return data;
      }
    }, baseData);
  }

  trackUpdate(queryKey, updateId) {
    if (!this.pendingUpdates.has(queryKey)) {
      this.pendingUpdates.set(queryKey, new Set());
    }
    this.pendingUpdates.get(queryKey).add(updateId);
  }

  untrackUpdate(queryKey, updateId) {
    const updates = this.pendingUpdates.get(queryKey);
    if (updates) {
      updates.delete(updateId);
      if (updates.size === 0) {
        this.pendingUpdates.delete(queryKey);
      }
    }
  }

  generateUpdateId() {
    return `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

## Building Your Own Query System: Applying the Patterns

Now that we understand the core patterns, let's build a simplified but functional query system that incorporates these principles. This exercise will cement your understanding and provide a foundation for custom implementations.

### Core Query System Implementation

```javascript
// Custom Query System: Foundation
class SimpleQuerySystem {
  constructor(options = {}) {
    this.cache = new Map(); // queryKey -> QueryEntry
    this.observers = new Map(); // queryKey -> Set<Observer>
    this.defaults = {
      staleTime: 0,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * Math.pow(2, attempt), 30000),
      ...options
    };
  }

  // Create a query hook
  createQuery(queryKey, queryFn, options = {}) {
    const config = { ...this.defaults, ...options };
    const key = this.normalizeKey(queryKey);
    
    return {
      subscribe: (observer) => this.subscribe(key, observer),
      fetch: () => this.fetch(key, queryFn, config),
      invalidate: () => this.invalidate(key),
      setData: (data) => this.setData(key, data),
      getData: () => this.getData(key)
    };
  }

  // React hook implementation
  useQuery(queryKey, queryFn, options = {}) {
    const [state, setState] = React.useState(() => {
      const key = this.normalizeKey(queryKey);
      return this.getQueryState(key);
    });

    React.useEffect(() => {
      const key = this.normalizeKey(queryKey);
      const query = this.createQuery(queryKey, queryFn, options);
      
      // Subscribe to changes
      const unsubscribe = query.subscribe((newState) => {
        setState(newState);
      });

      // Fetch if needed
      const entry = this.cache.get(key);
      if (this.shouldFetch(entry, options)) {
        query.fetch();
      }

      return unsubscribe;
    }, [this.normalizeKey(queryKey)]);

    return state;
  }

  subscribe(queryKey, observer) {
    if (!this.observers.has(queryKey)) {
      this.observers.set(queryKey, new Set());
    }
    
    this.observers.get(queryKey).add(observer);

    return () => {
      const observers = this.observers.get(queryKey);
      if (observers) {
        observers.delete(observer);
        if (observers.size === 0) {
          this.observers.delete(queryKey);
          this.scheduleGarbageCollection(queryKey);
        }
      }
    };
  }

  async fetch(queryKey, queryFn, config) {
    const entry = this.getOrCreateEntry(queryKey, config);
    
    // Prevent duplicate requests
    if (entry.promise) {
      return entry.promise;
    }

    // Update state to loading
    this.updateEntry(queryKey, {
      status: entry.data === undefined ? 'loading' : 'refreshing',
      isFetching: true,
      error: null
    });

    // Create fetch promise with retry logic
    entry.promise = this.createFetchPromise(queryFn, config)
      .then(data => {
        this.updateEntry(queryKey, {
          status: 'success',
          data,
          error: null,
          dataUpdatedAt: Date.now(),
          failureCount: 0,
          isFetching: false
        });
        return data;
      })
      .catch(error => {
        const newFailureCount = entry.failureCount + 1;
        
        this.updateEntry(queryKey, {
          status: 'error',
          error,
          errorUpdatedAt: Date.now(),
          failureCount: newFailureCount,
          isFetching: false
        });

        // Retry if configured
        if (this.shouldRetry(newFailureCount, config.retry)) {
          const delay = config.retryDelay(newFailureCount - 1);
          setTimeout(() => {
            this.fetch(queryKey, queryFn, config);
          }, delay);
        }

        throw error;
      })
      .finally(() => {
        const currentEntry = this.cache.get(queryKey);
        if (currentEntry) {
          currentEntry.promise = null;
        }
      });

    return entry.promise;
  }

  async createFetchPromise(queryFn, config) {
    const controller = new AbortController();
    
    try {
      const result = await queryFn({ signal: controller.signal });
      return result;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error('Query cancelled');
      }
      throw error;
    }
  }

  getOrCreateEntry(queryKey, config) {
    let entry = this.cache.get(queryKey);
    
    if (!entry) {
      entry = {
        status: 'idle',
        data: undefined,
        error: null,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        isFetching: false,
        promise: null,
        config
      };
      
      this.cache.set(queryKey, entry);
    }

    return entry;
  }

  updateEntry(queryKey, updates) {
    const entry = this.cache.get(queryKey);
    if (!entry) return;

    Object.assign(entry, updates);
    
    // Notify observers
    const observers = this.observers.get(queryKey);
    if (observers) {
      const state = this.getQueryState(queryKey);
      observers.forEach(observer => observer(state));
    }
  }

  getQueryState(queryKey) {
    const entry = this.cache.get(queryKey);
    
    if (!entry) {
      return {
        status: 'idle',
        data: undefined,
        error: null,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: false
      };
    }

    return {
      status: entry.status,
      data: entry.data,
      error: entry.error,
      isLoading: entry.status === 'loading',
      isFetching: entry.isFetching,
      isSuccess: entry.status === 'success',
      isError: entry.status === 'error',
      dataUpdatedAt: entry.dataUpdatedAt,
      errorUpdatedAt: entry.errorUpdatedAt,
      failureCount: entry.failureCount
    };
  }

  shouldFetch(entry, options) {
    if (!entry || entry.data === undefined) return true;
    
    const { staleTime = this.defaults.staleTime } = options;
    const isStale = Date.now() - entry.dataUpdatedAt > staleTime;
    
    return isStale;
  }

  shouldRetry(failureCount, retryConfig) {
    if (typeof retryConfig === 'boolean') {
      return retryConfig && failureCount < 3;
    }
    
    if (typeof retryConfig === 'number') {
      return failureCount < retryConfig;
    }
    
    return failureCount < 3;
  }

  normalizeKey(queryKey) {
    return Array.isArray(queryKey) 
      ? JSON.stringify(queryKey)
      : String(queryKey);
  }

  // Cache management
  invalidate(queryKey) {
    const entry = this.cache.get(queryKey);
    if (entry) {
      entry.dataUpdatedAt = 0; // Mark as stale
      
      // Trigger refetch if there are active observers
      const observers = this.observers.get(queryKey);
      if (observers && observers.size > 0) {
        // Refetch logic would go here
      }
    }
  }

  setData(queryKey, data) {
    this.updateEntry(queryKey, {
      status: 'success',
      data,
      dataUpdatedAt: Date.now()
    });
  }

  getData(queryKey) {
    const entry = this.cache.get(queryKey);
    return entry?.data;
  }

  scheduleGarbageCollection(queryKey) {
    setTimeout(() => {
      const observers = this.observers.get(queryKey);
      if (!observers || observers.size === 0) {
        const entry = this.cache.get(queryKey);
        if (entry) {
          const { cacheTime } = entry.config || this.defaults;
          const timeSinceUpdate = Date.now() - Math.max(
            entry.dataUpdatedAt,
            entry.errorUpdatedAt
          );
          
          if (timeSinceUpdate > cacheTime) {
            this.cache.delete(queryKey);
          }
        }
      }
    }, 5000);
  }
}
```

### Usage Examples and Best Practices

```javascript
// Create query system instance
const querySystem = new SimpleQuerySystem({
  staleTime: 30000, // 30 seconds
  cacheTime: 300000, // 5 minutes
  retry: 2
});

// API functions
const fetchUser = async ({ signal }) => {
  const response = await fetch('/api/user', { signal });
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

const fetchPosts = async ({ signal }) => {
  const response = await fetch('/api/posts', { signal });
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

// React components using the custom system
const UserProfile = () => {
  const { data: user, isLoading, error } = querySystem.useQuery(
    ['user'],
    fetchUser,
    { staleTime: 60000 } // Override default stale time
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

const PostsList = () => {
  const { data: posts, isLoading, error } = querySystem.useQuery(
    ['posts'],
    fetchPosts
  );

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts: {error.message}</div>;

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
};
```

## Production Considerations and Advanced Patterns

When implementing these patterns in production applications, several additional considerations become crucial:

### Memory Management and Performance

```javascript
// Enhanced memory management
class ProductionQuerySystem extends SimpleQuerySystem {
  constructor(options = {}) {
    super(options);
    this.memoryThreshold = options.memoryThreshold || 100; // Max cached queries
    this.compressionEnabled = options.compression || false;
    this.performanceMonitoring = options.monitoring || false;
  }

  updateEntry(queryKey, updates) {
    super.updateEntry(queryKey, updates);
    
    // Monitor memory usage
    if (this.cache.size > this.memoryThreshold) {
      this.performMemoryCleanup();
    }
    
    // Performance monitoring
    if (this.performanceMonitoring) {
      this.trackPerformanceMetrics(queryKey, updates);
    }
  }

  performMemoryCleanup() {
    const entries = Array.from(this.cache.entries());
    
    // Sort by last access time (oldest first)
    entries.sort(([, a], [, b]) => {
      const aTime = Math.max(a.dataUpdatedAt, a.errorUpdatedAt);
      const bTime = Math.max(b.dataUpdatedAt, b.errorUpdatedAt);
      return aTime - bTime;
    });

    // Remove oldest entries that have no active observers
    const toRemove = entries.slice(0, Math.floor(this.memoryThreshold * 0.2));
    
    toRemove.forEach(([key]) => {
      const observers = this.observers.get(key);
      if (!observers || observers.size === 0) {
        this.cache.delete(key);
      }
    });
  }

  trackPerformanceMetrics(queryKey, updates) {
    // Implementation would depend on your monitoring solution
    if (updates.dataUpdatedAt) {
      const fetchTime = Date.now() - (updates.fetchStartTime || 0);
      console.log(`Query ${queryKey} completed in ${fetchTime}ms`);
    }
  }
}
```

### Error Boundary Integration

```javascript
// Query Error Boundary
class QueryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Query Error Boundary caught an error:', error, errorInfo);
    
    // Reset specific queries that may have caused the error
    if (this.props.querySystem) {
      this.props.querySystem.invalidateAll();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Conclusion: Mastering the Patterns

TanStack Query's architecture represents a masterclass in solving complex state management challenges through elegant, composable patterns. By understanding and implementing these patterns ourselves, we gain several crucial advantages:

1. **Deep Understanding**: We comprehend the underlying mechanisms that make modern state management possible
2. **Flexibility**: We can adapt these patterns to specific use cases that may not fit standard library constraints
3. **Performance Optimization**: We can fine-tune implementations for specific performance requirements
4. **Debugging Capability**: We understand the system well enough to diagnose and fix complex issues

The patterns we've explored—the Observer pattern for reactivity, sophisticated caching strategies, intelligent request deduplication, and graceful error handling—are fundamental building blocks that extend far beyond any single library. These are the architectural principles that power the next generation of web applications.

Whether you use TanStack Query in production or implement these patterns yourself, the key is understanding that modern web applications require sophisticated approaches to state management. The complexity isn't incidental—it's the necessary sophistication required to deliver the seamless, responsive experiences users expect.

As web applications continue to evolve toward real-time, collaborative experiences with offline support and optimistic interactions, these patterns will only become more critical. Master them now, and you'll be prepared for whatever the future of web development brings. 