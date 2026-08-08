<template>
  <div class="font-mono text-terminal-text antialiased bg-terminal-bg min-h-screen">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <header class="border-b border-terminal-border pb-4 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-terminal-green">➜</span>
            <span class="text-terminal-text ml-2">~</span>
            <span class="text-terminal-cyan ml-2">portfolio</span>
          </div>
          <div class="flex items-center space-x-4 text-xs">
            <a href="https://github.com/chrisphua" target="_blank" rel="noopener" class="text-terminal-muted hover:text-terminal-text transition">
              <span class="text-terminal-green">gh</span>/chrisphua
            </a>
            <a href="https://www.linkedin.com/in/chris-phua/" target="_blank" rel="noopener" class="text-terminal-muted hover:text-terminal-text transition">
              <span class="text-terminal-cyan">li</span>/chris-phua
            </a>
            <span class="text-terminal-muted">|</span>
            <span class="text-terminal-muted"><span class="text-terminal-amber">[SPACE]</span> jump</span>
          </div>
        </div>
      </header>

      <main>
        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-2">$ whoami</div>
          <h1 class="text-2xl md:text-3xl font-bold text-terminal-text mb-2">{{ profile.name }}</h1>
          <p class="text-terminal-amber mb-4">{{ profile.title }}</p>
          <div class="w-full mb-6">
            <PixelCharacter />
          </div>
          <p class="text-terminal-muted leading-relaxed max-w-2xl mb-6">
            {{ profile.bio }}
          </p>
          <div class="flex items-center space-x-4">
            <a
              href="https://github.com/chrisphua"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center px-4 py-2 bg-terminal-surface border border-terminal-border text-terminal-green hover:border-terminal-green transition text-sm"
            >
              $ gh profile
            </a>
            <a
              href="https://www.linkedin.com/in/chris-phua/"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center px-4 py-2 bg-terminal-surface border border-terminal-border text-terminal-cyan hover:border-terminal-cyan transition text-sm"
            >
              $ li profile
            </a>
          </div>
        </section>

        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-4">$ cat skills.txt</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="category in skills.categories" :key="category.title">
              <h3 class="text-terminal-amber text-sm font-semibold mb-2">{{ category.title }}:</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in category.items"
                  :key="skill"
                  class="text-terminal-text text-sm"
                >
                  {{ skill }}<span class="text-terminal-border">;</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-4">$ cat experience.log</div>
          <div class="space-y-6">
            <div v-for="item in experience.items" :key="item.role + item.company" class="border-l-2 border-terminal-border pl-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-terminal-text font-semibold">{{ item.role }}</h3>
                <span class="text-terminal-green text-sm">{{ item.period }}</span>
              </div>
              <p class="text-terminal-amber text-sm mt-1">{{ item.company }}</p>
              <p class="text-terminal-muted mt-2 text-sm leading-relaxed">{{ item.description }}</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-for="tag in item.tags" :key="tag" class="text-xs text-terminal-muted">
                  [{{ tag }}]
                </span>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-4">$ cat education.log</div>
          <div class="space-y-6">
            <div v-for="item in education.items" :key="item.school" class="border-l-2 border-terminal-border pl-4">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 class="text-terminal-text font-semibold">{{ item.school }}</h3>
                <span class="text-terminal-green text-sm">{{ item.period }}</span>
              </div>
              <p class="text-terminal-amber text-sm mt-1">{{ item.degree }} — {{ item.field }}</p>
              <p class="text-terminal-muted mt-2 text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-4">$ ls projects/</div>
          <div class="space-y-4">
            <div v-for="project in projects.items" :key="project.title" class="border border-terminal-border p-4 hover:border-terminal-green transition">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-terminal-text font-semibold">{{ project.title }}</h3>
                  <p class="text-terminal-muted mt-1 text-sm">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span v-for="tag in project.tags" :key="tag" class="text-xs text-terminal-muted">
                      [{{ tag }}]
                    </span>
                  </div>
                </div>
                <a
                  :href="project.link"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center text-sm text-terminal-cyan hover:text-terminal-green whitespace-nowrap"
                >
                  $ cat {{ project.title.toLowerCase() }}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-12">
          <div class="text-terminal-muted text-sm mb-4">$ contact --method linkedin</div>
          <p class="text-terminal-muted text-sm mb-4">Feel free to reach out on LinkedIn.</p>
          <a
            href="https://www.linkedin.com/in/chris-phua/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center px-4 py-2 bg-terminal-surface border border-terminal-border text-terminal-cyan hover:border-terminal-cyan transition text-sm"
          >
            $ li message
          </a>
        </section>
      </main>

      <footer class="border-t border-terminal-border pt-4 mt-8">
        <div class="text-terminal-muted text-xs">
          <span class="text-terminal-green">➜</span> <span class="text-terminal-text">~</span> <span class="text-terminal-cyan">portfolio</span> <span class="text-terminal-muted">$</span> <span class="animate-pulse">_</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import PixelCharacter from '~/components/PixelCharacter.vue'

export default {
  components: {
    PixelCharacter
  },
  async asyncData({ $content }) {
    const profile = await $content('profile').fetch()
    const skills = await $content('skills').fetch()
    const experience = await $content('experience').fetch()
    const education = await $content('education').fetch()
    const projects = await $content('projects').fetch()

    return {
      profile,
      skills,
      experience,
      education,
      projects
    }
  },
  head() {
    return {
      title: `${this.profile.name} - ${this.profile.title}`,
      bodyAttrs: {
        class: 'bg-terminal-bg text-terminal-text'
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

::selection {
  background-color: #4ADE80;
  color: #0C0C0C;
}

a {
  text-decoration: none;
}

.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
