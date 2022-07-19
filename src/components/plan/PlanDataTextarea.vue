<template>
  <plan-data-input>
    <h6 class="c-title">Заметки</h6>
    <div class="c-content">
      <textarea required class="c-input" />
    </div>
  </plan-data-input>
</template>

<script>
import PlanDataInput from "@/components/plan/PlanDataInput";

export default {
  components: {
    PlanDataInput,
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

  &:focus,
  &:focus-visible {
    border: 1px solid rgba($color-main, 0.5);
    outline: none;
  }
}
</style>