<template>
  <div class="notifications-container">
    <h2>我的通知</h2>
    <el-timeline v-if="notifications.length > 0">
      <el-timeline-item
          v-for="item in notifications"
          :key="item.notificationId"
          :timestamp="formatDate(item.date)"
          placement="top"
          :color="item.isRead ? '#909399' : '#0bbd87'"
      >
        <el-card @click.native="markAsRead(item)" :class="{ 'is-read': item.isRead }">
          <h4>{{ item.message }}</h4>
          <p v-if="!item.isRead" class="unread-tip">点击标记为已读</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-else description="暂无通知"></el-empty>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getNotifications, markNotificationAsRead } from "@/api";
import qs from "qs";

export default {
  name: "ReaderNotifications",
  data() {
    return {
      notifications: [],
    };
  },
  computed: {
    ...mapState({
      readerId(state) {
        return state.User.readerInfo.readerId;
      },
    }),
  },
  methods: {
    fetchNotifications() {
      if (!this.readerId) return;
      getNotifications(qs.stringify({ readerId: this.readerId })).then((res) => {
        if (res.status === 200) {
          this.notifications = res.data;
          // Also update the badge count when the page is loaded
          this.$store.dispatch('Notification/updateUnreadCount', { readerId: this.readerId });
        }
      });
    },
    markAsRead(notification) {
      if (notification.isRead) return;
      markNotificationAsRead(qs.stringify({ notificationId: notification.notificationId })).then((res) => {
        if (res.status === 200) {
          notification.isRead = true;
          this.$message({
            type: "success",
            message: "已标记为已读",
          });
          // After marking as read, update the badge count
          this.$store.dispatch('Notification/updateUnreadCount', { readerId: this.readerId });
        }
      });
    },
    formatDate(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  mounted() {
    this.fetchNotifications();
  },
};
</script>

<style lang="less" scoped>
.notifications-container {
  padding: 20px;
  h2 {
    text-align: center;
    margin-bottom: 25px;
    color: #333;
  }
  .el-card {
    border-left: 5px solid #0bbd87;
    cursor: pointer;
    transition: all 0.3s;
    background-color: rgba(255, 255, 255, 0.85);
    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transform: translateY(-3px);
    }
    &.is-read {
      border-left-color: #909399;
      h4, p {
        color: #909399;
      }
    }
  }
  .unread-tip{
    font-size: 12px;
    color: #999;
    text-align: right;
  }
}
</style>