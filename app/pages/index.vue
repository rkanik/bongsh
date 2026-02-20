<template>
  <div class="p-4">
    <h1>Families</h1>
    <DataTable :value="families" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="slug" header="Slug"></Column>
      <Column field="description" header="Description"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
const { data: families } = await useAsyncData("families", () =>
  $fetch("/api/families")
);
</script>
