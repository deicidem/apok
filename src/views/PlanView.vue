<template>
  <div>
    This is task {{id}}
  </div>
</template>

<script>
export default {
  computed: {
    id() {
				return +this.$route.params.id
			},
  }
}
</script>