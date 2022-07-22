<template>
  <plan-data-input>
    <h6 class="c-title">{{ title }}</h6>
    <div class="c-content">
      <textarea class="c-input" v-model="localValue" />
    </div>
  </plan-data-input>
</template>

<script>
import PlanDataInput from "@/components/plan/PlanDataInput";

export default {
  components: {
    PlanDataInput,
  },
  props: {
    title: String,
    value: String,
  },
  data() {
    return {
      localValue: null,
    };
  },
  mounted() {
    this.localValue = this.value;
  },
  watch: {
    localValue: function () {
      console.log(1);
      this.$emit("input", this.localValue);
    },
    value: function () {
      this.localValue = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.c-input {
  border: 1px solid #dfdfdf;
  background: $white;
  min-height: 30px;
  min-width: 360px;
  width: 100%;
  max-width: 600px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;

  &:focus,
  &:focus-visible {
    border: 1px solid rgba($color-main, 0.5);
    outline: none;
  }
}
</style>