# `mastodon-post`

A Web Component to display Mastodon posts and their metadata.

**[Demo](https://daviddarnes.github.io/mastodon-post/demo.html)** | **[Custom template demo](https://daviddarnes.github.io/mastodon-post/demo-custom-template.html)** | **[Further reading](https://darn.es/mastodon-post-web-component/)**

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

Example using a more complex custom template:

```html
<script type="module" src="mastodon-post.js"></script>

<template id="mastodon-post-template">
  <dl>
    <dt>Reposts</dt>
    <dd data-key="reblogs_count"></dd>
    <dt>Replies</dt>
    <dd data-key="replies_count"></dd>
    <dt>Favourites</dt>
    <dd data-key="favourites_count"></dd>
  </dl>
  <a data-key="url">
    View original post from <img alt="avatar" data-key="account.avatar" />
    <strong data-key="account.display_name"></strong> on
    <strong data-key="hostname"></strong>
  </a>
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
- Use a custom template for specific instances using the `template` attribute
- Retrieve nested data using the `data-key` attribute and typical JavaScript key referencing, e.g. `data-key="account.display_name"` or `data-key="media_attachments[0]preview_url"`

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

You can also use different templates on the same page by using the `template` attribute to target `<template>` elements with a specific `id`:

```html
<template id="custom-template">
  <a data-key="content, url"></a>
</template>

<mastodon-post template="custom-template">
  <a href="https://mastodon.design/@DavidDarnes/109824258017750161">
    Discuss on Mastodon
  </a>
</mastodon-post>
```

Data is applied using a `data-key` data attribute. The value of this attribute should correspond to a data point within a [Mastodon public status API response](https://docs.joinmastodon.org/methods/statuses/). The official Mastodon documentation has [an example of a status response here](https://docs.joinmastodon.org/methods/statuses/#200-ok-1). The `data-key` attribute also allows you to target nested data using typical JavaScript dot notation:

```html
<template id="mastodon-post-template">
  <figure>
    <blockquote data-key="content"></blockquote>
    <figcaption>
      <cite>
        <a data-key="url">
          View original post from
          <img alt="avatar" data-key="account.avatar" />
          <strong data-key="account.display_name"></strong> on
          <strong data-key="hostname"></strong>
        </a>
      </cite>
    </figcaption>
  </figure>
</template>
```

_Note that for `<a>` and `<img>` elements the value won't be applied to it's content if the string being returned starts with `http` and instead will be applied to the `href` and `src` attributes respectively._

Check out the [custom template demo](https://daviddarnes.github.io/mastodon-post/demo-custom-template.html) as well as [the source code](https://github.com/daviddarnes/mastodon-post/blob/main/demo-custom-template.html) for reference.

## Credit

With thanks to the following people:

- [Zach Leatherman](https://zachleat.com) for inspiring this [Web Component repo template](https://github.com/daviddarnes/component-template)
