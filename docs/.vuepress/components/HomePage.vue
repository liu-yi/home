<template>
  <div class="main">
    <div style="padding-top: calc(22vh)">
      <div id="logo" style="text-align: center">
        <img
          @click="gotonotes"
          style="border-radius: 50%; width: calc(30vh)"
          v-on="{ mouseenter: mouseEnter, mouseleave: mouseLeave }"
          :src="logo_list[here_logo]"
        />
      </div>
      <div style="text-align: center">
        <span
          @mouseenter="hover_name = true"
          @mouseleave="hover_name = false"
          style="font-size: 2em"
          >{{ hover_name ? "刘 逸" : "Yi Liu" }}</span
        >
      </div>
      <div style="text-align: center"><span></span><span id="info"></span></div>
      <div style="text-align: center; margin-top: 2%">
        <n-popover
          width="240px"
          placement="bottom"
          trigger="hover"
          @update:show="handleUpdateShow"
        >
          <template #trigger>
            <n-button round size="large" style="width: 300px">
              <span style="font-size: 18px">{{
                here ? "Quick Start" : "Here!"
              }}</span>
            </n-button>
          </template>
          <template #header>
            <div style="text-align: center">
              <n-button
                text
                icon-placement="right"
                style="font-size: 20px"
                @click="successCopyEmail"
              >
                <template #icon>
                  <n-icon>
                    <CopyOutlined />
                  </n-icon>
                </template>
                mail@imliuyi.com
              </n-button>
            </div>
          </template>
          <n-grid x-gap="12" :cols="3" style="margin-top: 10px">
            <n-gi>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <div style="padding-bottom: 40px; padding-left: 7px">
                    <a href="/YiLIU-CV-en.pdf" target="_blank">
                      <n-button text>
                        <template #icon>
                          <n-icon size="50">
                            <IdcardOutlined />
                          </n-icon>
                        </template>
                      </n-button>
                    </a>
                  </div>
                </template>
                <div style="text-align: center; font-size: 20px">CV</div>
                <div style="text-align: center; font-size: 16px">
                  <a href="/YiLIU-CV-zh_CN.pdf" target="_blank">[中文版]</a>
                </div>
              </n-tooltip>
            </n-gi>
            <n-gi>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <div style="padding-bottom: 40px; padding-left: 7px">
                    <a href="https://github.com/liu-yi" target="_blank">
                      <n-button text>
                        <template #icon>
                          <n-icon size="50">
                            <GithubFilled />
                          </n-icon>
                        </template>
                      </n-button>
                    </a>
                  </div>
                </template>
                <div style="text-align: center; font-size: 20px">Github</div>
              </n-tooltip>
            </n-gi>
            <n-gi>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <div style="padding-bottom: 40px; padding-left: 7px">
                    <a
                      href="https://www.linkedin.com/in/%E9%80%B8-%E5%88%98-363764114/"
                      target="_blank"
                    >
                      <n-button text>
                        <template #icon>
                          <n-icon size="50">
                            <LinkedinFilled />
                          </n-icon>
                        </template>
                      </n-button>
                    </a>
                  </div>
                </template>
                <div style="text-align: center; font-size: 20px">LinkedIn</div>
              </n-tooltip>
            </n-gi>
          </n-grid>
        </n-popover>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  IdcardOutlined,
  CopyOutlined,
} from "@vicons/antd";
import { defineComponent, ref, getCurrentInstance } from "vue";
import { init } from "ityped";
import {
  useMessage,
  NButton,
  NTooltip,
  NPopover,
  NGrid,
  NGi,
  NIcon,
} from "naive-ui";
import { copyText } from "vue3-clipboard";

export default defineComponent({
  data: function () {
    return {
      hover_avatar: false,
      hover_name: false,
      here: false,
      logo_list: ["/logo.jpg", "/logo1.jpg", "/logo2.jpg"],
      gotonotenum: 0,
    };
  },
  methods: {
    mouseEnter(event) {
      // console.log(event)
      this.hover_avatar = true;
    },
    mouseLeave(event) {
      // console.log(event)
      this.hover_avatar = false;
    },
  },
  computed: {
    here_logo() {
      if (this.hover_avatar) {
        return 1;
      } else if (this.here) {
        return 2;
      } else {
        return 0;
      }
    },
  },
  setup() {
    const o = getCurrentInstance();
    const email = ref("mail@imliuyi.com");
    const message = useMessage();
    return {
      successCopyEmail() {
        copyText("mail@imliuyi.com", undefined, (error, event) => {
          if (error) {
            message.warning("Can not copy. ", { duration: 3000 });
          } else {
            message.success("The e-mail address is copied. ", {
              duration: 3000,
            });
          }
        });
      },
      gotonotes() {
        o.data.gotonotenum++;
        if (o.data.gotonotenum == 5) {
          this.$router.push("/study-plan");
        }
      },
      show_paper: ref(false),
      showPopover: ref(false),
      email,
      handleUpdateShow(show) {
        o.data.here = show ? true : false;
      },
    };
  },
  mounted() {
    const oneElement = document.querySelector("#info");
    init(oneElement, {
      typeSpeed: 100,
      backDelay: 1500,
      showCursor: true,
      strings: [
        "My Chinese name is 刘逸. ",
        "I am a Ph.D. student at HKU. ",
        "I do research on Cryptography. ",
        "I am interested in cryptographic protocols. ",
        // "For example, multi-party computation, zero-knowledge proofs, etc.",
        "See my resume for more about me. ",
      ],
    });
  },
  components: {
    NTooltip,
    NPopover,
    NGrid,
    NGi,
    NIcon,
    NButton,
    GithubFilled,
    LinkedinFilled,
    MailFilled,
    IdcardOutlined,
    CopyOutlined,
  },
});
</script>

<style>
html,
body,
.main {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>