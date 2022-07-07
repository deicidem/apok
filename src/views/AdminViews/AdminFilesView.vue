<template>
  <admin-main title="Файлы">
    <template v-slot:content>
      <admin-files-content></admin-files-content>
    </template>
    <template v-slot:aside>
      <admin-files-aside></admin-files-aside>
    </template>
  </admin-main>
</template>

<script>
import AdminMain from "@/components/admin/AdminMain.vue";
import AdminFilesContent from "@/components/admin/files/AdminFilesContent.vue";
import AdminFilesAside from "@/components/admin/files/AdminFilesAside.vue";
export default {
  components: {
    AdminMain,
    AdminFilesContent,
    AdminFilesAside,
  },
};
</script>

<style>
</style>