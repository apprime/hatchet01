hatchet01
=========

Hello.

Hatchet is a made up name describing an effort to make a simple MVC framework for Node. This is not because there are not already good frameworks for node, but rather because I wanted to get under the hood a bit.

The general idea is to use a predefined structure that loads itself automatically. In other words, you need to name your files properly or face despair. The Model and Controller folders should contain pairs of files named Model_X.js and Controller_X.js respectively. Once that is done, you can add additional models to do other things as well and use the Router object to retreive a list of all of them during runtime.

Todo-list:
- View functionality. Each Controller needs to result in a view that handles variables of many different sorts. A view should be able to consist of a template and several subviews for more efficient building.

- Basic Authorization. Allow the server to throw a 403 if user is not authorized.
- Sessions and other persistance.
