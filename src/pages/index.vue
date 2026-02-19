<template>
  <div class="flex flex-col">
    <!-- Hero -->
    <section class="px-4 py-16 sm:py-24">
      <div class="mx-auto max-w-6xl flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div class="flex-1 text-center lg:text-left">
          <div
            class="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
              />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Your roots, one place
          </div>
          <h1
            class="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms]"
          >
            Build your
            <span class="text-primary">family tree</span>
            <br />
            together
          </h1>
          <p
            class="mt-6 text-lg text-muted-foreground max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:200ms]"
          >
            Map your roots, preserve stories, and connect with relatives—all in one simple, private
            space.
          </p>
          <div
            class="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:300ms]"
          >
            <RouterLink
              v-if="!authStore.user"
              to="/auth"
              class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Get started
            </RouterLink>
            <RouterLink
              v-else
              to="/app"
              class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open my tree
            </RouterLink>
            <RouterLink
              v-if="!authStore.user"
              to="/auth"
              class="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign in
            </RouterLink>
          </div>
        </div>
        <div
          class="placeholder-image w-full max-w-lg shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:150ms]"
          data-replace="hero"
        >
          <img
            src="/placeholder.svg"
            alt="Hero — replace with your image"
            class="aspect-4/3 w-full rounded-xl border border-border object-cover shadow-lg"
          />
        </div>
      </div>
    </section>

    <!-- Screenshot section: Light & Dark -->
    <section class="border-y border-border bg-muted/30 px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          See Bongsh in action
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          The same app, your way — light or dark. Replace the placeholders below with real
          screenshots.
        </p>
        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <p class="mb-3 text-sm font-medium text-muted-foreground">Light mode</p>
            <div class="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
              <div
                class="screenshot-frame__chrome rounded-t-xl border-b border-border bg-muted/80 px-4 py-3 flex items-center gap-2"
              >
                <span class="h-3 w-3 rounded-full bg-red-500/80" />
                <span class="h-3 w-3 rounded-full bg-amber-500/80" />
                <span class="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span
                  class="ml-4 flex-1 rounded bg-background/60 py-1 text-center text-xs text-muted-foreground"
                >
                  app.bongsh.example / tree
                </span>
              </div>
              <div
                class="placeholder-image rounded-b-xl overflow-hidden border border-t-0 border-border bg-card"
                data-replace="screenshot-light"
              >
                <img
                  src="/placeholder.svg"
                  alt="App screenshot — light mode (replace with your image)"
                  class="aspect-video w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <p class="mb-3 text-sm font-medium text-muted-foreground">Dark mode</p>
            <div class="rounded-xl border border-white/10 bg-zinc-900 shadow-xl overflow-hidden">
              <div
                class="screenshot-frame__chrome screenshot-frame__chrome--dark rounded-t-xl border-b border-white/10 bg-black/40 px-4 py-3 flex items-center gap-2"
              >
                <span class="h-3 w-3 rounded-full bg-red-500/80" />
                <span class="h-3 w-3 rounded-full bg-amber-500/80" />
                <span class="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span
                  class="ml-4 flex-1 rounded bg-white/10 py-1 text-center text-xs text-white/70"
                >
                  app.bongsh.example / tree
                </span>
              </div>
              <div
                class="placeholder-image rounded-b-xl overflow-hidden border border-t-0 border-white/10 bg-zinc-900"
                data-replace="screenshot-dark"
              >
                <img
                  src="/placeholder.svg"
                  alt="App screenshot — dark mode (replace with your image)"
                  class="aspect-video w-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          Why map your roots here
        </h2>
        <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
            >
              <span class="text-xl">{{ feature.icon }}</span>
            </div>
            <h3 class="mt-4 font-medium text-foreground">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ feature.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- How it works -->
    <section class="border-y border-border bg-muted/30 px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">How it works</h2>
        <p class="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Start in minutes. Grow your tree over a lifetime.
        </p>
        <ol class="mt-12 grid gap-10 sm:grid-cols-3">
          <li
            v-for="(step, index) in howItWorks"
            :key="step.title"
            class="relative flex flex-col items-center text-center"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary text-sm font-semibold text-primary-foreground"
            >
              {{ index + 1 }}
            </span>
            <div
              class="placeholder-image mt-4 aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-border bg-card"
              :data-replace="`how-it-works-${index + 1}`"
            >
              <img
                src="/placeholder.svg"
                :alt="`Step ${index + 1} — replace with your image`"
                class="h-full w-full object-cover"
              />
            </div>
            <h3 class="mt-4 font-medium text-foreground">{{ step.title }}</h3>
            <p class="mt-2 text-sm text-muted-foreground">{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- For everyone in the family -->
    <section class="px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          Built for the whole family
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Whether you're the keeper of stories or just getting started, Bongsh fits how you work.
        </p>
        <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(item, i) in forFamilies"
            :key="item.title"
            class="group rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              class="placeholder-image aspect-16/10 bg-muted/50"
              :data-replace="`family-${i + 1}`"
            >
              <img
                src="/placeholder.svg"
                :alt="`${item.title} — replace with your image`"
                class="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <div class="p-5">
              <h3 class="font-medium text-foreground">{{ item.title }}</h3>
              <p class="mt-2 text-sm text-muted-foreground">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="border-y border-border bg-muted/30 px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          Loved by families
        </h2>
        <div class="mt-12 grid gap-8 sm:grid-cols-2">
          <blockquote
            v-for="quote in testimonials"
            :key="quote.author"
            class="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <p class="text-foreground/90">{{ quote.text }}</p>
            <footer class="mt-4 flex items-center gap-3">
              <div
                class="placeholder-image h-10 w-10 overflow-hidden rounded-full bg-primary/20"
                :data-replace="`avatar-${quote.author.replace(/\s+/g, '-').toLowerCase()}`"
              >
                <img
                  src="/placeholder.svg"
                  :alt="quote.author"
                  class="h-full w-full object-cover"
                />
              </div>
              <div>
                <cite class="not-italic font-medium text-foreground">{{ quote.author }}</cite>
                <p class="text-sm text-muted-foreground">{{ quote.role }}</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-center text-2xl font-semibold text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <dl class="mt-12 space-y-6">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="rounded-xl border border-border bg-card p-5"
          >
            <dt class="font-medium text-foreground">{{ faq.question }}</dt>
            <dd class="mt-2 text-sm text-muted-foreground">{{ faq.answer }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="border-t border-border bg-primary/5 px-4 py-16 sm:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-semibold text-foreground sm:text-3xl">Ready to map your roots?</h2>
        <p class="mt-4 text-muted-foreground">
          Create your free account and start building your family tree today.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <RouterLink
            v-if="!authStore.user"
            to="/auth"
            class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get started — it's free
          </RouterLink>
          <RouterLink
            v-else
            to="/app"
            class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open my tree
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

const features = [
  {
    icon: '🌳',
    title: 'Visual tree',
    description: 'See your family as a clear, interactive tree you can zoom and explore.',
  },
  {
    icon: '📖',
    title: 'Stories & photos',
    description: 'Attach stories and photos to people so memories stay with the tree.',
  },
  {
    icon: '🔗',
    title: 'Invite relatives',
    description: 'Invite family to add and edit together so the tree grows with everyone.',
  },
]

const howItWorks = [
  {
    title: 'Create your tree',
    description:
      'Sign up and add yourself. Then add parents, siblings, and children—or start from an ancestor and work down.',
  },
  {
    title: 'Add stories & media',
    description:
      'Upload photos and write short stories or facts for each person. Link sources and dates to keep everything clear.',
  },
  {
    title: 'Invite & collaborate',
    description:
      'Send invites to relatives so they can fill in their branch and help keep the tree accurate and up to date.',
  },
]

const forFamilies = [
  {
    title: 'Family historians',
    description:
      'One place for your research. Attach sources, dates, and notes so nothing gets lost.',
  },
  {
    title: 'Storytellers',
    description:
      'Preserve memories and anecdotes next to the people they belong to, for the next generation.',
  },
  {
    title: 'Reconnecting families',
    description:
      'Share one tree with scattered relatives so everyone stays connected to their roots.',
  },
]

const testimonials = [
  {
    text: 'Finally we have one place where the whole family can see the tree and add stories. No more scattered spreadsheets.',
    author: 'Sarah M.',
    role: 'Family historian',
  },
  {
    text: 'My kids love seeing their great-grandparents’ photos right on the tree. It makes our history feel real.',
    author: 'James K.',
    role: 'Dad of three',
  },
]

const faqs = [
  {
    question: 'Is my family data private?',
    answer:
      'Yes. Your tree and media are private by default. You choose who can view or edit—only people you invite.',
  },
  {
    question: 'Can I import from another service?',
    answer:
      'We’re working on import from common formats. For now you can add people and links manually and we’ll expand options over time.',
  },
  {
    question: 'How many people can I add?',
    answer:
      'There’s no hard limit. Add as many relatives as you need and invite as many collaborators as you like.',
  },
  {
    question: 'Can I use it on my phone?',
    answer:
      'Bongsh works in your browser on desktop and mobile so you can view and edit your tree from anywhere.',
  },
]
</script>

