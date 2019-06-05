<template>
    <VFooter height="50">
        <div class="footer-items">
            <span
                    v-for="link in links"
                    :key="link.name"
            >
                <a
                        :href="link.Link"
                        class="tertiary--text footer-links"
                >{{ link.name }}</a>
            </span>
        </div>
        <VSpacer />
        <span class="font-weight-light copyright">
            &copy;
            2018-
            {{ (new Date()).getFullYear() }}
            <a
                    href="https://www.github.com/Yeuoly"
                    target="_blank"
            >Yeuoly</a>
        </span>
    </VFooter>
</template>

<script>
    export default {
        data: () => ({
            links: [
                { name: "站长B站个人空间", Link: "https://space.bilibili.com/40691233" },
            ]
        })
    };
</script>

<style>
    #core-footer {
        z-index: 0;
    }
</style>