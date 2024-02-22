const mastodonPostTemplate = document.createElement("template");

mastodonPostTemplate.innerHTML = `
<figure>
  <blockquote data-key="content"></blockquote>
  <figcaption>
    <cite>
      <a data-key="url"><span data-key="username"></span>@<span data-key="hostname"></span></a>
    </cite>
    <dl>
      <dt>Reposts</dt><dd data-key="reblogs_count"></dd>
      <dt>Replies</dt><dd data-key="replies_count"></dd>
      <dt>Favourites</dt><dd data-key="favourites_count"></dd>
    </dl>
  </figcaption>
</figure>
`;

mastodonPostTemplate.id = "mastodon-post-template";

if (!document.getElementById(mastodonPostTemplate.id)) {
  document.body.appendChild(mastodonPostTemplate);
}

class MastodonPost extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "mastodon-post", MastodonPost);
    }
  }

  async connectedCallback() {
    this.append(this.template);

    const data = { ...(await this.data), ...this.linkData };

    this.querySelectorAll("[data-key]").forEach(async (slot) => {
      const { key } = slot.dataset;
      const value = this.getValue(key, data);

      if (key === "content") {
        slot.innerHTML = value;
      } else if (typeof value === "string" && value.startsWith("http")) {
        if (slot.localName === "a") slot.href = value;
        if (slot.localName === "img") slot.src = value;
      } else {
        slot.textContent = value;
      }
    });
  }

  handleKey(object, key) {
    const parsedKeyInt = parseFloat(key);

    if (Number.isNaN(parsedKeyInt)) {
      return object[key];
    }

    return object[parsedKeyInt];
  }

  getValue(string, data) {
    let keys = string.split(/\.|\[|\]/g);
    keys = keys.filter((string) => string.length);

    const value = keys.reduce(
      (object, key) => this.handleKey(object, key),
      data
    );
    return value;
  }

  get template() {
    return document
      .getElementById(mastodonPostTemplate.id)
      .content.cloneNode(true);
  }

  get link() {
    return this.querySelector("a").href;
  }

  get linkData() {
    const url = new URL(this.link);
    const paths = url.pathname.split("/").filter((string) => string.length);
    return {
      url: this.link,
      hostname: url.hostname,
      username: paths.find((path) => path.startsWith("@")),
      postId: paths.find((path) => !path.startsWith("@")),
    };
  }

  get endpoint() {
    return `https://${this.linkData.hostname}/api/v1/statuses/${this.linkData.postId}`;
  }

  get data() {
    return fetch(this.endpoint).then((response) => response.json());
  }
}

MastodonPost.register();
