<template>
    <div class="image-uploader">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <div class="dropzone-container">
                        <vue-dropzone ref="pageDropzone" id="dropzone"
                                      :options="dropzoneOptions" :useCustomSlot="true"
                                      v-on:vdropzone-success="fileUploadSuccess">

                            <div class="dropzone-custom-content">
                                <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                                <div class="subtitle">or click to select a file from your computer</div>
                            </div>
                        </vue-dropzone>
                    </div>
                </div>

                <div class="col-6">
                    <transition name="swoopIn">
                        <div class="uploaded-file-list" v-if="imageRows.length > 0">
                            <h2>Your Uploaded Files</h2>

                            <ul class="list-unstyled">
                                <li v-for="row in imageRows" :key="row.url">
                                    <div class="icon">
                                        <img :src="row.url" />
                                    </div>

                                    <div class="info">
                                        <p class="name">{{ row.name }}</p>
                                        <p class="url">{{ row.url }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'

    export default {
        components: {
            vueDropzone: vue2Dropzone
        },
        data: function () {
            return {
                dropzoneOptions: {
                    url: process.env.VUE_APP_API_URL + '/media/upload',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    useCustomSlot: true
                },
                imageRows: []
            }
        },
        methods: {
            fileUploadSuccess(file, response) {
                this.appendImageRow(file.name, response.url);

                setTimeout(() => {
                    this.$refs.pageDropzone.removeFile(file);
                }, 1000);
            },
            appendImageRow(name, url) {
                this.imageRows.push({
                    name,
                    url
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    $theme-color: #E7E7E7;

    .image-uploader {
        font-family: 'Exo', sans-serif;
        background-image: url('../assets/doodles.png');
        padding-top: 5vh;
        padding-bottom: 5vh;

        h2 {
            margin: 0 0 20px;
            font-size: 20px;
            font-weight: bold;
        }

        > .container {
            height: calc(90vh - 90px);

            > .row {
                height: 100%;
            }
        }
    }

    .vue-dropzone {
        height: calc(90vh - 90px);
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: 'Exo', sans-serif;
    }

    .dz-default {
        display: none;
    }

    .dropzone-custom-content {
        width: 300px;

        h3 {
            font-weight: normal;
            font-size: 30px;
        }

        .subtitle {
            font-size: 20px;
        }
    }

    .uploaded-file-list {
        position: relative;
        left: 0;

        ul {
            border: 1px solid darken($theme-color, 10%);
            border-radius: 6px;
            overflow: hidden;
        }

        li {
            padding: 10px 16px;
            border-top: 1px solid darken($theme-color, 10%);
            background: $theme-color;
            display: flex;
            flex-direction: row;
            align-items: center;

            &:first-child {
                border-top: none;
            }

            .icon {
                width: 80px;
                margin-right: 5%;
                text-align: center;

                img {
                    max-width: 80px;
                    max-height: 80px;
                }
            }

            .info {
                /*width: 75%;*/
                flex: 1;
            }

            .name {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
                color: darken($theme-color, 40%);
            }

            .url {
                margin: 0;
                font-size: 13px;
            }
        }
    }

    .swoopIn-enter-active, .swoopIn-leave-active {
        transition: all 1s;
    }

    .swoopIn-enter, .swoopIn-leave-to {
        transform: scale(0.8);
        opacity: 0;
    }
</style>
