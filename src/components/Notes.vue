<template>
    <div class="notes">
        <div class="container-fluid">
            <div class="write-note">
                <label for="note" class="sr-only">Type a note</label>
                <div class="input-group">
                    <input type="text" id="note" class="form-control note" placeholder="Type a new note..."
                           autocomplete="off"
                           v-model="note"
                           @keyup.enter="submitNote"
                           required>
                </div>
            </div>

            <div class="cards">
                <transition-group tag="div" class="row justify-content-center mt-5" name="swoopIn">
                    <div class="col-6 col-sm-4 col-md-3 col-xl-2" v-for="(note, i) in notes" :key="note.id">
                        <div class="card" :class="note.theme.class"
                             v-bind:style="{ transform: 'rotate(' + note.rotate + ')' }">

                            <div class="card-body">
                                <div class="card-icon">
                                    <i></i>
                                </div>

                                <div class="card-title-container">
                                    <h5 class="card-title" @click="editNote(i)" v-if="!note.editing">{{ note.note }}</h5>

                                    <input type="text" id="edit-note" class="form-control edit-note"
                                           v-if="note.editing"
                                           autocomplete="off"
                                           v-model="note.note"
                                           @keyup.enter="submitEditNote(i)"
                                           required>
                                </div>

                                <div class="card-actions" v-if="!note.editing">
                                    <a href="#" class="card-action"
                                       @click="deleteNote(i)"><i class="fas fa-check"></i></a>

                                    <a href="#" class="card-action"
                                       @click="editNote(i)"><i class="fas fa-pencil-alt"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    const getRotate = () => {
        const items = ['3deg', '1deg', '-2deg', '-4deg'];
        return items[Math.floor(Math.random() * items.length)];
    };

    export default {
        components: {
        },
        data: function () {
            return {
                notes: [],
                note: '',
                themes: [
                    { class: 'pastel-blue' },
                    { class: 'pastel-green' },
                    { class: 'pastel-orange' },
                    { class: 'pastel-yellow' },
                    { class: 'pastel-red' },
                ]
            }
        },
        methods: {
            submitNote() {
                this.notes.unshift({
                    id: Math.floor(Math.random() * 1000000000),
                    note: this.note,
                    theme: this.themes[0],
                    rotate: getRotate(),
                    editing: false
                });

                this.note = '';

                const shiftTheme = this.themes.shift();
                this.themes.push(shiftTheme);
            },
            deleteNote(i) {
                this.notes.splice(i, 1);
            },
            editNote(i) {
                this.notes[i].editing = true;
            },
            submitEditNote(i) {
                this.notes[i].editing = false;
            }
        }
    }
</script>

<style lang="scss">
    $theme-color: #E7E7E7;

    .notes {
        background-image: url('../assets/cork-wallet.png');
        padding: 5vh;

        h2 {
            margin: 0 0 20px;
            font-size: 20px;
        }

        > .container-fluid {
            height: calc(90vh - 90px);
        }

        #note {
            font-size: 40px;
            border: none;
            text-align: center;
            outline: none;
            padding: 10px 0;
            height: 60px;
            background: none;

            &:focus{
                outline: none;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
        }

        .cards {
        }

        .card {
            margin-bottom: 30px;
            padding-top: 40px;
            border: none;
            border-radius: 0;
            min-height: 200px;

            .card-icon {
                position: absolute;
                top: 8px;
                width: 100%;
                text-align: center;
                left: 0;

                i {
                    background-image: url('../assets/thumbtack.png');
                    background-repeat: no-repeat;
                    background-size: contain;
                    display: inline-block;
                    margin-left: -10px;
                    width: 60px;
                    height: 45px;
                }
            }

            .card-title {
                text-align: center;
            }

            .card-actions {
                position: absolute;
                bottom: 5px;
                right: 10px;

                .card-action {
                    font-size: 20px;
                    color: #000;
                    display: inline-block;
                    margin: 0 5px;
                    text-decoration: none;
                }
            }

            &.pastel-red {
                background: #FFB3BA;
            }
            &.pastel-orange {
                background: #FFDFBA;
            }
            &.pastel-yellow {
                background: #FFFFBA;
            }
            &.pastel-green {
                background: #BAFFC9;
            }
            &.pastel-blue {
                background: #BAE1FF;
            }
        }
    }

    .swoopIn-enter-active, .swoopIn-leave-active {
        transition: all 0.5s;
    }

    .swoopIn-enter, .swoopIn-leave-to {
        transform: scale(1.1);
        opacity: 0;
    }
</style>
