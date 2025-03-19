<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");
const login = () => {
  console.log("Logging in with", username.value, password.value);
};
</script>

<template>
  <div class="container">
    <div class="login-box">
        <h1>เข้าสู่ระบบ</h1>
        <p>ระบบจัดการนักศึกษาและอาจารย์ที่ปรึกษา</p>

        <form @submit.prevent="login">
            <div>
            <label for="username">ชื่อผู้ใช้</label>
            <input
                id="username"
                v-model="username"
                type="text"
                placeholder="กรอกชื่อผู้ใช้"
                />
            </div>

            <div>
            <label for="password">รหัสผ่าน</label>
            <input
                id="password"
                v-model="password"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                />
            </div>

            <button type="submit">เข้าสู่ระบบ</button>
        </form>

        <p class="register-text">
            นักศึกษาใหม่? <a href="#" class="register-link">ลงทะเบียน</a>
        </p>
    </div>
  </div>
</template>

<style scoped>
label {
    display: block;
    margin: 10px 0 5px;
    font-weight: bold;
}

input {
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 15px;
}

.register-text {
    margin-top: 10px;
    font-size: 14px;
}

.register-link {
    color: #007bff;
    text-decoration: none;
}

.register-link:hover {
    text-decoration: underline;
}
</style>
