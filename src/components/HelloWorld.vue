<template>
  <div class="d-flex flex-column">
    <video autoplay muted loop id="homeVideo">
      <source
        src="https://firebasestorage.googleapis.com/v0/b/p-estudios-mint.appspot.com/o/videoHome.mp4?alt=media&token=dd8bd306-59e5-49bb-b3cc-b5e1daa6140d"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script>
export default {
  data: () => ({})
}
</script>

<style>
#homeVideo {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
