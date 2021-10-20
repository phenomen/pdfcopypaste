<template>
  <div class="container px-4 mx-auto">
    <div class="hero min-h-screen">
      <div class="text-center hero-content">
        <div class="max-w-5xl">
          <h1 class="mb-3 text-4xl uppercase font-bold">
            PDF Copypaste
          </h1>
          <p class="mb-5 text-gray-500 text-sm">
            An app to remove linebreaks and hyphenations when copypasting text
            from PDF
          </p>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Original Text</span>
            </label>
            <textarea
              class="textarea h-64 textarea-primary textarea-bordered"
              placeholder="Ctrl+V"
              v-model="originalCopy"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Fixed Text</span>
            </label>
            <textarea
              class="textarea h-64 textarea-success textarea-bordered"
              placeholder="Ctrl+C"
              @focus="$event.target.select()"
              >{{ fixedCopy }}</textarea
            >
          </div>
          <p class="mt-12 text-sm">
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
  computed: {
    fixedCopy: function() {
      return this.originalCopy
        .replace(/(\r\n|\n|\r)/g, " ")
        .replaceAll("‑ ", "");
    }
  }
};
</script>
