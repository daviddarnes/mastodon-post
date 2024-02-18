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

      if (key === "content") {
        slot.innerHTML = data[key];
      } else if (key === "url") {
        slot.href = this.link;
      } else {
        slot.textContent = data[key];
      }
    });
  }

  get template() {
    return document.getElementById(mastodonPostTemplate.id).content.cloneNode(true);
  }

  get link() {
    return this.querySelector("a").href;
  }

  get linkData() {
    const url = new URL(this.link);
    const paths = url.pathname.split("/").filter((string) => string.length);
    return {
      hostname: url.hostname,
      username: paths.find((path) => path.startsWith("@")),
      postId: paths.find((path) => !path.startsWith("@"))
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
