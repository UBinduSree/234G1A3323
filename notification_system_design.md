# Stage 1

## Priority Inbox Design

The objective is to ensure that students see the most important unread notifications first.
### Priority Rules
Notification priority is determined using:
Placement > Result > Event
Weights:
* Placement = 3
* Result = 2
* Event = 1
### Priority Score Calculation

Each notification receives a score based on:

Priority Score = Weight + Recency

Recent notifications receive higher preference within the same category.

### Current Implementation

1. Fetch notifications from API.
2. Assign weight based on notification type.
3. Sort notifications by priority score.
4. Return top 10 notifications.

### Time Complexity

O(N log N)

where N is the number of notifications.

### Optimized Production Design

For a continuously growing notification stream, a Min Heap of size 10 can be maintained.

Complexity:

O(N log 10)

≈ O(N)

### Benefits

* Fast retrieval of top notifications
* Supports real-time incoming notifications
* Scalable for large notification volumes
* Easy to maintain and extend
