<template>
  <div class="main">
    <n-grid x-gap="12" :cols="1" style="padding-top: calc(22vh)">
      <n-gi>
        <div id="logo" style="text-align: center">
          <img
            style="border-radius: 50%; width: calc(30vh)"
            v-on="{ mouseenter: mouseEnter, mouseleave: mouseLeave }"
            :src="logo_list[here_logo]"
          />
        </div>
      </n-gi>
      <n-gi>
        <div style="text-align: center">
          <span
            @mouseenter="hover_name = true"
            @mouseleave="hover_name = false"
            style="font-size: 2em"
            >{{ hover_name ? "刘 逸" : "Yi Liu" }}</span
          >
        </div>
        <div style="text-align: center">
          <span></span><span id="info"></span>
        </div>
      </n-gi>
      <n-gi>
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
                  here ? "Want to know or contact me?" : "Here!"
                }}</span>
              </n-button>
            </template>
            <template #header>
              <n-text strong depth="1">
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
              </n-text>
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
                  <div style="text-align: center; font-size: 20px">Resume</div>
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
                  <div style="text-align: center; font-size: 20px">
                    LinkedIn
                  </div>
                </n-tooltip>
              </n-gi>
            </n-grid>
            <!-- <n-divider />
          <div style="font-size: 16px; text-align: center">
            <a href="/papers/">See my papers</a>
          </div> -->
          </n-popover>
        </div>
      </n-gi>
      <!-- <n-gi>
      <n-button @click="show_paper = !show_paper">点击来转圈</n-button>
      <n-space vertical>
        <n-spin :show="show_paper">
          <n-alert title="啦啦啦" type="success">
            hello
          </n-alert>
          <template #description>转圈中</template>
        </n-spin>
      </n-space>
    </n-gi> -->
    </n-grid>
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
import { useMessage } from "naive-ui";
import { copyText } from "vue3-clipboard";

export default defineComponent({
  data: function () {
    return {
      hover_avatar: false,
      hover_name: false,
      here: false,
      logo_list: ["/logo.jpg", "/logo1.jpg", "/logo2.jpg"],
    };
  },
  methods: {
    mouseEnter(event) {
      // console.log(event)
      this.hover_avatar = true; 
    },
    mouseLeave(event){
      // console.log(event)
      this.hover_avatar = false; 
    }
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
        "I do research on Cryptography.",
        "See my resume for more about me. ",
      ],
    });
  },
  components: {
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