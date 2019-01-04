<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">tdanielcox Demos</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/upload" class="nav-link" active-class="active">Image Uploader</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/notes" class="nav-link" active-class="active">Notes</router-link>
                </li>
            </ul>

            <ul class="navbar-nav mr-5">
                <li class="nav-item">
                    <a href="https://github.com/tdanielcox/demos" target="_blank" class="nav-link">
                        <i class="fab fa-github mr-1"></i> Github
                    </a>
                </li>
            </ul>

            <ul class="navbar-nav">
                <li class="nav-item text-right">
                    <p>Created by Daniel Cox</p>
                    <small><a href="mailto:tdanielcox@gmail.com" class="nav-link">tdanielcox@gmail.com</a></small>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        components: {

        },
        data: function () {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    $theme-color: #E7E7E7;

    .navbar {
        height: 90px;
    }

    .nav-item {

        p {
            color: #FFF;
            padding: 0.5rem 0.5rem 0;
            margin: 0 0 -12px;
        }
    }

    .nav-link {

        a:hover {
            text-decoration: none;
        }
    }
</style>
