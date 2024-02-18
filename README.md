# `mastodon-post`

A Web Component to display Mastodon posts and their metadata.

**[Demo](https://daviddarnes.github.io/mastodon-post/demo.html)**

## Examples

General usage example:

```html
<script type="module" src="mastodon-post.js"></script>

<mastodon-post>
  <a href="https://mastodon.design/@DavidDarnes/109824258017750161">Discuss on Mastodon</a>
</mastodon-post>
```

Example using a custom template:

```html
<script type="module" src="mastodon-post.js"></script>

<template id="mastodon-post-template">
  <blockquote data-key="content"></blockquote>
</template>

<mastodon-post>
  <a href="https://mastodon.design/@DavidDarnes/109824258017750161">Discuss on Mastodon</a>
</mastodon-post>
```

## Features

This Web Component allows you to:

- Turn a regular Mastodon post link into a quoted Mastodon post
- Surface the post metadata alongside the post, e.g. reply count, reblog count, favourite count
- Use a custom template for all instances of the component on the page using a `data-key="name"` data attributes

## Installation

You have a few options (choose one of these):

1. Install via [npm](https://www.npmjs.com/package/@daviddarnes/mastodon-post): `npm install @daviddarnes/mastodon-post`
1. [Download the source manually from GitHub](https://github.com/daviddarnes/mastodon-post/releases) into your project.
1. Skip this step and use the script directly via a 3rd party CDN (not recommended for production use)

### Usage

Make sure you include the `<script>` in your project (choose one of these):

```html
<!-- Host yourself -->
<script type="module" src="mastodon-post.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://www.unpkg.com/@daviddarnes/mastodon-post@1.0.0/mastodon-post.js"
></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script
  type="module"
  src="https://esm.sh/@daviddarnes/mastodon-post@1.0.0"
></script>
```

### Using a custom template

TBC

## Credit

With thanks to the following people:

- [Zach Leatherman](https://zachleat.com) for inspiring this [Web Component repo template](https://github.com/daviddarnes/component-template)
