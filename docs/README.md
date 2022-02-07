---
# home: true
# navbar: false
sidebar: false
---

<n-message-provider placement="top">
<HomePage/>
</n-message-provider>

<script>

import { defineComponent, ref, getCurrentInstance } from "vue";
import { NMessageProvider } from "naive-ui";

export default defineComponent({
  components: {
      NMessageProvider
  },
});
</script>
