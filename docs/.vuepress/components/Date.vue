<template>
  <div>
	<span>{{ currentDate }}</span>
  </div>
</template>

<script>
export default {
  data() {
	return {
	  currentDate: '',
	};
  },
  mounted() {
	this.getCurrentDate();
  },
  methods: {
	getCurrentDate() {
	  const today = new Date();
	  const year = today.getFullYear();
	  const month = today.getMonth() + 1;
	  const day = today.getDate();
	  this.currentDate = `${year}-${month}-${day}`;
	},
  },
};
</script>
