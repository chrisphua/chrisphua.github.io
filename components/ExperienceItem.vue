<template>
  <div class="relative pl-8 pb-8 border-l-2 border-indigo-100 last:border-l-0 last:pb-0">
    <div class="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-indigo-600 border-4 border-white shadow"></div>
    <div>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-lg font-semibold text-gray-800">{{ item.role }}</h3>
        <span class="text-sm text-indigo-600 font-medium">{{ item.period }}</span>
      </div>
      <p class="text-gray-600 font-medium mt-1">{{ item.company }}</p>
      <p class="text-gray-500 mt-2 text-sm leading-relaxed">{{ item.description }}</p>
      <div class="flex flex-wrap gap-2 mt-3">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
