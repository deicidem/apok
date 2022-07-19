<template>
  <admin-main :title="title" :loading="loading">
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
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminMain,
    AdminFilesContent,
    AdminFilesAside,
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters('admin/files', ['getFilesUser']),
    title() {
      if (this.getFilesUser != null) {
        return `Файлы (Пользователь - ${this.getFilesUser.name})`
      } else {
        return `Файлы`
      }
    }
  },
  methods: {
    ...mapActions('admin/files', ['fetchFiles', 'filterByUser', "fetchAll"])
  },
  async mounted() {
    if (this.$route.query?.userId) {
      await this.filterByUser(this.$route.query?.userId);
    } else {
      await this.fetchAll();
    }
    this.loading = false;
  },
};
</script>

<style>
</style>