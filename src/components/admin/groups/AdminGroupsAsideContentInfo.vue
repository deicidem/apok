<template>
  <admin-aside-block title="Информация о группе">
    <div class="content-info">
      <table class="content-info__table">
          <tbody>
            <tr>
              <td>Название</td>
              <td>
                <span
                  @blur="updateData.title = $event.target.innerText"
                  :contenteditable="editable"
                  :class="{ editable }"
                >
                  {{ group.title }}
                </span>
              </td>
            </tr>
            <tr>
              <td>Описание</td>
              <td>
                <span
                  @blur="updateData.description = $event.target.innerText"
                  :contenteditable="editable"
                  :class="{ editable }"
                >
                  {{ group.description }}
                </span>
              </td>
            </tr>
            <tr>
              <td>Тип</td>
              <td>
                <keep-alive>
                <app-select v-if="editable" @change="updateData.type = $event" :options="groupTypesOptions" class="content-info__select" ></app-select>
                <span v-else>{{ group.type }}</span>
                </keep-alive>
              </td>
            </tr>
            <tr>
              <td>Владелец</td>
              <td>
                <router-link class="check link"
                :to="{ path: '/admin/users', query: { userId: group.owner.id } }"
              >
                {{ group.owner.firstName }} {{ group.owner.lastName }}
              </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      <!-- <div class="content-info__text">
        <div class="content-info__information">
          <div class="content-info__editable">
            <p class="content-info__title">Название</p>
            <div class="content-edit">
              <div class="check">{{ group.title }}</div>
            </div>
          </div>
           <div class="content-info__editable">
            <p class="content-info__title">Описание</p>
            <div class="content-edit">
              <div class="check">{{ group.description}}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Тип группы</p>
            <div class="content-edit">
              <div class="check">{{ group.type }}</div>
            </div>
          </div>
          <div class="content-info__editable">
            <p class="content-info__title">Владелец</p>
            <div class="content-edit">
              <router-link class="check link"
                :to="{ path: '/admin/users', query: { userId: group.owner.id } }"
              >
                {{ group.owner.firstName }} {{ group.owner.lastName }}
              </router-link>
            </div>
          </div>
        </div>
      </div> -->

      <div class="content-info__buttons">
        <app-button
            type="button-g"
            class="content-info__button"
            v-if="editable"
            @click="onEditDone"
          >
            Готово
          </app-button>
          <app-button
            type="button-white-gr"
            class="content-info__button"
            v-else
            @click="editable = true"
          >
            Редактировать
          </app-button>
        <app-button
          type="button-r"
          @click="$emit('delete', group.id)"
          class="content-info__button"
        >
          Удалить
        </app-button>
      </div>
    </div>

    <!-- <div class="content-wrapper">
      <div class="content-wrapper__text">
        <div class="content-info__information">
          <div
            class="content-info__editable"
            v-for="(item, key) in info"
            :key="key"
          >
            <p class="content-info__title">{{ item.title }}</p>
            <div class="content-edit">
              <div class="check">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-info__buttons">
        <app-button
          type="button-r"
          @click="$emit('delete', group.id)"
          :disabled="!group.deletable"
          class="content-info__button"
        >
          Удалить
        </app-button>
      </div>
    </div> -->
  </admin-aside-block>
</template>

<script>
import AdminAsideBlock from "@/components/admin/AdminAsideBlock";
import AppButton from "@/components/controls/AppButton";
import AppSelect from "@/components/controls/AppSelect";
import {mapGetters} from "vuex";
export default {
  components: {
    AdminAsideBlock,
    AppButton,
    AppSelect,
  },
  props: ["group"],
  data: () => ({
    updateData: {
      title: null,
      description: null,
      type: 1,
    },
    editable: false
  }),
  computed: {
    ...mapGetters("groupTypes", ["getGroupTypes"]),
    groupTypesOptions() {
      return this.getGroupTypes.map(el => ({text: el.title, value: el.id}))
    }
  },
  mounted() {
    this.updateData.title = this.group.title;
    this.updateData.description = this.group.description;
    this.updateData.type = this.group.typeId;
  },
  methods: {
    onEditDone() {
      this.editable = false;
      this.$emit('update', {
        title: this.updateData.title,
        description: this.updateData.description,
        type: this.updateData.type,
      });
    },
  }
  // data() {
  //   return {
  //     info: {
  //       title: {
  //         title: "Название",
  //         value: null,
  //         editable: true,
  //       },
  //       date: {
  //         title: "Дата добавления",
  //         value: null,
  //         editable: true,
  //       },
  //       status: {
  //         title: "Статус",
  //         value: null,
  //         editable: true,
  //       },
  //       user: {
  //         title: "Пользователь",
  //         value: null,
  //         editable: true,
  //       },
  //     },

  //     editable: false,
  //     showPopup: false,
  //   };
  // },
  // mounted() {
  //   this.info.title.value = this.group.title;
  //   this.info.date.value = this.group.date;
  //   this.info.status.value = this.group.status;
  //   this.info.user.value = this.group.user;
  // },
  // watch: {
  //   group() {
  //     this.info.title.value = this.group.title;
  //     this.info.date.value = this.group.date;
  //     this.info.status.value = this.group.status;
  //     this.info.user.value = this.group.user;
  //   },
  // },
};
</script>

<style scoped lang="scss">
.content {
  padding: 20px;
  border-radius: 10px;
  background: $white;
  box-shadow: $shadow-small;
  margin-top: 20px;

  &-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-title {
    font-weight: 400;
    font-size: 18px;
    color: $black;
    margin-bottom: 20px;
  }

  &-info {
    &__table {
      font-size: 14px;
      table-layout: fixed;
      border-collapse: collapse;
      td {
        padding: 7px;
        vertical-align: top;
        &:first-child {
          color: $color-main;
          padding-left: 0;
        }
        & span {
          border-radius: 7px;
          padding: 3px;
          display: inline-block;
          min-width: 100px;
          max-width: 100%;
        }
        & .editable {
          outline: 1px solid $color-main;
          &:focus-visible {
            outline: 1px solid $color-main;
          }
        }
      }
      margin-bottom: 10px;
    }
    &__select {
      max-width: 200px;
    }
    &__buttons {
      display: flex;
    }
    &__button {
      flex: 1 1 auto;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }

    &__title {
      margin: 0;
      color: $color-main;
      line-height: 20px;
      font-size: 14px;
      width: 100px;
    }

    &__info {
      color: $black;
      margin-bottom: 14px;
      font-size: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    // &__buttons {
    //   margin-top: 20px;
    //   display: flex;
    // }

    // &__button {
    //   margin-right: 20px;
    //   flex: 1 1 auto;
    //   &:last-child {
    //     margin-right: 0;
    //   }
    // }

    &__editable {
      display: flex;
      align-items: center;
      margin-bottom: 14px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.link{
  text-decoration: underline;
  color: $color-main-dark;
}
</style>