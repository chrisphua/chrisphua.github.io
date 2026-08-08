<template>
  <div class="max-w-xs w-full">
    <div
      class="
        flex
        items-center
        justify-center
        h-40
        bg-gray-50
        rounded-md
        overflow-hidden
        border border-gray-100
      "
    >
      <img class="object-cover h-10" :src="project.image" :alt="project.title" />
    </div>

    <a
      :href="project.link"
      target="_blank"
      rel="noopener"
      class="
        block
        bg-white
        mt-5
        rounded-md
        overflow-hidden
        shadow-sm
        border border-gray-100
        transition
        duration-300
        ease-in-out
        transform
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div class="py-4 px-4 text-center">
        <p class="text-gray-800 font-medium">{{ project.title }}</p>
        <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ project.description }}</p>
        <div class="flex flex-wrap justify-center gap-2 mt-3">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>
