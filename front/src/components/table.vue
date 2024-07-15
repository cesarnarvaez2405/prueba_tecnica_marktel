<template>
  <div class="flex flex-col rounded-lg">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full">
        <div class="overflow-x-auto">
          <table class="min-w-full table-fixed text-center">
            <thead class="border-b">
              <tr>
                <th
                  v-for="(header, index) in headers"
                  :key="index"
                  scope="col"
                  class="font-semibold text-white bg-secondary uppercase text-primary px-2 py-1 border"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b hover:bg-zinc-100"
                v-for="(item, index) in dataItems"
                :key="index"
              >
                <td
                  v-for="(header, i) in headers"
                  :key="i"
                  class="px-2 py-1 font-medium text-gray-900 border text-sm"
                >
                  {{ item[header.value] }}
                  <slot :name="header.value" :item="item"></slot>
                </td>
              </tr>

              <tr class="bg-white border-b w-full" v-if="dataItems.length == 0">
                <td
                  :colspan="headers.length"
                  class="px-2 py-1 whitespace-nowrap font-medium text-gray-900 border"
                >
                  <span class="flex gap-2 text-xl justify-center py-2">
                    <svg
                      class="h-8 w-8 text-tertiary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    No hay datos disponibles
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
    
  <script>
import { ref, watch, watchEffect } from "vue";

export default {
  props: {
    headers: { type: Array, default: [] },
    items: { type: Array, default: [] },
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: "Cargando... Por favor espere" },
    noResultsText: { type: String, default: "¡No hay resultados!" },
  },
  setup(props) {
    const dataItems = ref([]);

    watchEffect(() => {
      dataItems.value = props.items;
    });

    return {
      dataItems,
    };
  },
};
</script>
  
  <style></style>