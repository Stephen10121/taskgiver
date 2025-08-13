<div></div>

<style>
    div {
        position: fixed;
        z-index: 200;
        top: 0;
        left: 0;
        width: 100vw;
        height: 5px;
        background: repeating-linear-gradient(to right, #ee3f3f 0%, #3aa0e9 50%, red 100%);
        background-size: 200% auto;
        background-position: 0 100%;
        animation: gradient 2s infinite;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    }

    @keyframes gradient { 
        0%   { background-position: 0 0; }
        100% { background-position: -200% 0; }
    }
</style>