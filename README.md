# `mastodon-post`

A Web Component to display Mastodon posts and their metadata.

**[Demo](https://daviddarnes.github.io/mastodon-post/demo.html)** | **[Custom template demo](https://daviddarnes.github.io/mastodon-post/demo-custom-template.html)**

## Examples

General usage example:

```html
<script type="module" src="mastodon-post.js"></script>

<mastodon-post>
  <a href="https://mastodon.design/@DavidDarnes/109824258017750161">
    Discuss on Mastodon
  </a>
</mastodon-post>
```

Example using a custom template:

```html
<script type="module" src="mastodon-post.js"></script>

<template id="mastodon-post-template">
  <blockquote data-key="content"></blockquote>
</template>

<mastodon-post>
  <a href="https://mastodon.design/@DavidDarnes/109824258017750161">
    Discuss on Mastodon
  </a>
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

The default template for the component looks like this:

```html
<figure>
  <blockquote data-key="content"></blockquote>
  <figcaption>
    <cite>
      <a data-key="url">
        <span data-key="username"></span>
        @
        <span data-key="hostname"></span>
      </a>
    </cite>
    <dl>
      <dt>Reposts</dt>
      <dd data-key="reblogs_count"></dd>
      <dt>Replies</dt>
      <dd data-key="replies_count"></dd>
      <dt>Favourites</dt>
      <dd data-key="favourites_count"></dd>
    </dl>
  </figcaption>
</figure>
```

However you can customise the template by using a `<template>` element with an `id` of `mastodon-post-template`, which will be used for every instance of the component on the page. Here's an example which just exposes the vanity metrics of the Mastodon post as a `<dl>`:

```html
<template id="mastodon-post-template">
  <dl>
    <dt>Reposts</dt>
    <dd data-key="reblogs_count"></dd>
    <dt>Replies</dt>
    <dd data-key="replies_count"></dd>
    <dt>Favourites</dt>
    <dd data-key="favourites_count"></dd>
  </dl>
</template>
```

Data is applied using a `data-key` data attribute. The value of this attribute corresponds to one of the following data points returned by the Mastodon API plus some pieces of data formed within the component itself:

- content: The post content itself, as a HTML string "<p>Example content</p>"
- `created_at`: The time of the post in UTC, e.g. "2023-02-07T15:53:07.042Z"
- `edited_at`: The time of the post being last edited in UTC, e.g. "2023-02-08T15:53:07.042Z"
- `favourites_count`: Favourite count
- `hostname`: The Mastodon host site, e.g. "mastodon.social"
- `id`: The ID of the post
- `in_reply_to_account_id`: The ID of the account being replied to, if it's a reply
- `in_reply_to_id`: The ID of the post being replied to, if it's a reply
- `language`: The language locale code
- `postId`: The post ID
- `reblogs_count`: The reblog or boost count
- `replies_count`: The replies count
- `sensitive`: If the post has been marked as sensitive, boolean
- `spoiler_text`: The hidden spoiler text, if applied
- `uri`: The post URI
- `url`: The original post URL from the anchor in the component
- `username`: The username, lifted from the original post URL
- `visibility`: The visibility type

For `<a>` and `<img>` elements the value won't be applied to it's content if the string being returned starts with `http` and will be instead be applied to the `href` and `src` attributes respectively.

Check out the [custom template demo](https://daviddarnes.github.io/mastodon-post/demo-custom-template.html) as well as [the source code](https://github.com/daviddarnes/mastodon-post/blob/main/demo-custom-template.html) for reference.

## Credit

With thanks to the following people:

- [Zach Leatherman](https://zachleat.com) for inspiring this [Web Component repo template](https://github.com/daviddarnes/component-template)
