import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { PostList } from './app/features/posts/postsList'
import { AddPostForm } from './app/features/posts/AddPostForm'
import { SinglePostPage } from './app/features/posts/SinglePostPage'
import { EditPostForm } from './app/features/posts/EditPostForm'
import { UsersList } from './app/features/users/UserList'
import { NotificationList } from './app/features/notifications/NotificationsList'
import { UserPage } from './app/features/users/UserPage'
import { Navbar } from './app/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/notifications"
            render={(props) => <NotificationList {...props} />}
          />
          <Route
            exact
            path="/posts/:postId"
            render={({ match }) => <SinglePostPage match={match} />}
          />
          <Route
            exact
            path="/editPost/:postId"
            render={({ match }) => <EditPostForm match={match} />}
          />
          <Route
            exact
            path="/users"
            render={(props) => <UsersList {...props} />}
          />
          <Route
            exact
            path="/users/:userId"
            render={(props) => <UserPage {...props} />}
          />
          <Route
            exact
            path=""
            render={() => (
              <>
                <AddPostForm />
                <PostList />
              </>
            )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
