<template>
  <div>
    <svg
      width="100%"
      height="192px"
      viewBox="0 0 197 192"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>黄</title>
      <defs>
        <linearGradient
          x1="0%"
          y1="100%"
          x2="100%"
          y2="100%"
          id="linearGradient-2"
        >
          <stop stop-color="#FFB64B" offset="0%"></stop>
          <stop stop-color="#FF972A" offset="100%"></stop>
        </linearGradient>
      </defs>

      <g
        id="页面-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="流程效能-流程分析"
          transform="translate(-1386.000000, -205.000000)"
        >
          <g id="黄" transform="translate(1396.000000, 215.000000)">
            <circle
              id="椭圆形备份-6"
              stroke="#F5F7FB"
              stroke-width="10"
              cx="88.5"
              cy="88.5"
              r="88.5"
            ></circle>
            <path
              d="M165.814236,132 C172.9393,119.207285 177,104.463892 177,88.7691873 C177,39.7433189 137.3772,0 88.5,0 C39.6227996,0 0,39.7433189 0,88.7691873 C0,103.381967 3.52014247,117.170073 9.7562636,129.326894"
              id="路径备份-3"
              stroke="url(#linearGradient-1)"
              stroke-width="20"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ["startColor", "endColor", "count", "text"],
};
</script>

<style lang="scss" scoped></style>
