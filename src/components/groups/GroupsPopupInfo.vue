<template>
  <div class="el">
    <div class="el-block">
      <div class="el-title">Информация о группе</div>
      <div class="el-info">
        <table class="el-info__table">
          <tbody>
            <tr>
              <td>Название</td>
              <td>
                <span
                  @blur="updateData.title = $event.target.innerText"
                  :contenteditable="editable"
                  :class="{ editable }"
                >
                  {{ getActiveGroup.title }}
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
                  {{ getActiveGroup.description }}
                </span>
              </td>
            </tr>
            <tr>
              <td>Тип</td>
              <td>
                <keep-alive>
                <app-select v-if="editable" @change="updateData.type = $event" :options="groupTypesOptions" class="el-info__select" ></app-select>
                <span v-else>{{ getActiveGroup.type }}</span>
                </keep-alive>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="el-info__buttons">
          <app-button
            type="button-g"
            class="el-info__button"
            v-if="editable"
            @click="onEditDone"
          >
            Готово
          </app-button>
          <app-button
            type="button-white-gr"
            class="el-info__button"
            v-else
            @click="editable = true"
          >
            Редактировать
          </app-button>
          <app-button
            @click="onDelete()"
            type="button-r"
            class="el-info__button"
          >
            Удалить
          </app-button>
        </div>
      </div>
    </div>

    <div class="el-block">
      <div class="el-title">Приглашение</div>
      <div class="el-invite">
        <div class="el-invite__data">
          <app-input
            class="el-invite__data__input"
            v-model="expiresValue"
            label="Количество"
          ></app-input>
          <app-select
            class="el-invite__data__select"
            @change="expiresType = $event"
            :options="options"
          ></app-select>
        </div>
        <div class="el-invite__button">
          <app-button type="button-g" @click="onSubmit()"
            >Сгенерировать ссылку</app-button
          >
        </div>
      </div>
      <div class="el-invite__link" v-if="getInviteLink != null">
        <div class="el-invite__link__text">
          <span class="el-invite__link__title">Ссылка для приглашения:</span>
          {{ getInviteLink }}
        </div>
        <input
          class="el-invite__link__text__hidden"
          readonly
          :value="getInviteLink"
          ref="link"
        />
        <app-button @click="onCopy()" type="button-svg button-svg-white"
          ><i class="icon icon-ic_fluent_document_copy_20_regular"></i
        ></app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/controls/AppButton";
import AppSelect from "@/components/controls/AppSelect";
import AppInput from "@/components/controls/AppInput";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AppButton,
    AppSelect,
    AppInput,
  },
  props: ["confirmRef"],
  data: () => ({
    editable: false,
    expiresValue: null,
    expiresType: null,
    updateData: {
      title: null,
      description: null,
      type: 1,
    },
    options: [
      {
        text: "Минуты",
        value: "minutes",
      },
      {
        text: "Часы",
        value: "hours",
      },
      {
        text: "Дни",
        value: "days",
      },
      {
        text: "Месяцы",
        value: "months",
      },
      {
        text: "Годы",
        value: "years",
      },
    ],
  }),
  computed: {
    ...mapGetters("groups", ["getActiveGroup", "getInviteLink"]),
    ...mapGetters("groupTypes", ["getGroupTypes"]),
    groupTypesOptions() {
      return this.getGroupTypes.map(el => ({text: el.title, value: el.id}))
    }
  },
  mounted() {
    this.updateData.title = this.getActiveGroup.title;
    this.updateData.description = this.getActiveGroup.description;
    this.updateData.type = this.getActiveGroup.typeId;
  },
  methods: {
    ...mapActions("groups", [
      "generateInviteLink",
      "deleteGroup",
      "updateGroup",
    ]),
    async onSubmit() {
      await this.generateInviteLink({
        type: this.expiresType,
        value: +this.expiresValue,
      });
    },
    onEditDone() {
      this.editable = false;
      this.updateGroup({
        title: this.updateData.title,
        description: this.updateData.description,
        type: this.updateData.type,
      });
    },
    async onDelete() {
      const ok = await this.confirmRef.show({
        title: "Вы уверены, что хотите удалить эту группу?",
        message:
          "Удаление этой группы приведет к потере всех связанных с ней данных.",
        actionMessage: "Удалить",
      });
      if (ok) {
        this.$emit("close");
        await this.deleteGroup(this.getActiveGroup.id);
      }
    },
    onCopy() {
      this.$refs.link.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style lang="scss" scoped>
.el {
  &-title {
    margin-bottom: 15px;
    font-size: 18px;
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
  }
  &-invite {
    display: flex;
    justify-content: space-between;
    &__link {
      display: flex;
      &__title {
        color: $black;
      }
      &__text {
        display: block;
        width: 100%;
        appearance: none;
        margin-right: 20px;
        font-size: 14px;
        color: $color-main;
        word-break: break-all;
        border: none;
        &:focus-within {
          outline: none;
        }
        &__hidden {
          position: absolute;
          z-index: -100;
          opacity: 0;
          // width: 0;
          // height: 0;
        }
      }
    }
    &__data {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      &__input {
        margin-right: 15px;
      }
    }
  }
  &-block {
    padding: 15px;
    width: 100%;
    box-shadow: $shadow-small;
    border-radius: 10px;
    margin-bottom: 15px;
    background: #fff;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>