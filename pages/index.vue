<template>
  <div class="container max-w-full px-4 mx-auto bg-gray-200">
    <div class="hero min-h-screen">
      <div class="text-center hero-content">
        <div class="max-w-full">
          <h1 class="mb-3 text-4xl uppercase font-bold">
            PDF Copypaste
          </h1>
          <p class="mb-5 text-gray-500 text-sm">
            An app to remove linebreaks and hyphenations
          </p>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">Original Text</span>
            </label>
            <textarea
              class="textarea md:h-64 h-32 textarea-bordered"
              placeholder="Ctrl+V"
              v-model="originalCopy"
              @focus="$event.target.select()"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">Fixed Text</span>
            </label>
            <textarea
              class="textarea md:h-64 h-32 textarea-success textarea-bordered"
              placeholder="Ctrl+C"
              @focus="$event.target.select()"
              >{{ fixedCopy }}</textarea
            >

            <div class="my-4">
              <button
                v-on:click="copyClipboard(fixedCopy)"
                class="btn btn-outline btn-wide"
              >
                COPY TO CLIPBOARD
              </button>
            </div>
          </div>
          <p class="mt-12 text-sm text-gray-500 ">
            PDF Copypaste is an open source app by @Phenomen.
            <a
              class="link link-primary"
              href="https://github.com/Phenomen/pdfcopypaste"
              target="_blank"
              >GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalCopy: ""
    };
  },

  methods: {
    copyClipboard(text) {
      navigator.clipboard.writeText(text);
    }
  },

  computed: {
    fixedCopy: function() {
      return this.originalCopy
        .replace(/(\r\n|\n|\r)/g, " ")
        .replaceAll("‑ ", "")
        .replaceAll("  ", " ")
        .replaceAll("‑", "-")
        .replaceAll("- ", "");
    }
  }
};
</script>
