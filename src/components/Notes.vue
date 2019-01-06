<template>
    <div class="notes">
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

        <transition-group tag="div" class="cards mt-5" name="swoopIn">
            <div class="card-container" v-for="(note, i) in notes" :key="note.id">
                <div class="card" :class="note.theme" v-bind:style="{
                     transform: 'rotate(' + note.rotate + ')',
                     zIndex: 100 - i
                 }">

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
                            <a href="javascript:" class="card-action"
                               @click="editNote(i)"><i class="fas fa-pencil-alt"></i></a>

                            <b-dropdown variant="link" class="card-action-dropdown" no-caret>
                                <template slot="button-content">
                                    <a href="javascript:" class="card-action">
                                        <i class="fas fa-palette"></i>
                                    </a>
                                </template>

                                <b-dropdown-item @click="setTheme(i, 'pastel-blue')" :active="note.theme === 'pastel-blue'">
                                    <i class="card-theme-preview pastel-blue"></i>
                                    Blue
                                </b-dropdown-item>

                                <b-dropdown-item @click="setTheme(i, 'pastel-green')" :active="note.theme === 'pastel-green'">
                                    <i class="card-theme-preview pastel-green"></i>
                                    Green
                                </b-dropdown-item>

                                <b-dropdown-item @click="setTheme(i, 'pastel-orange')" :active="note.theme === 'pastel-orange'">
                                    <i class="card-theme-preview pastel-orange"></i>
                                    Orange
                                </b-dropdown-item>

                                <b-dropdown-item @click="setTheme(i, 'pastel-yellow')" :active="note.theme === 'pastel-yellow'">
                                    <i class="card-theme-preview pastel-yellow"></i>
                                    Yellow
                                </b-dropdown-item>

                                <b-dropdown-item @click="setTheme(i, 'pastel-red')" :active="note.theme === 'pastel-red'">
                                    <i class="card-theme-preview pastel-red"></i>
                                    Red
                                </b-dropdown-item>
                            </b-dropdown>

                            <a href="javascript:" class="card-action float-right"
                               @click="deleteNote(i)"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
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
                    'pastel-blue',
                    'pastel-green',
                    'pastel-orange',
                    'pastel-yellow',
                    'pastel-red',
                ]
            }
        },
        methods: {
            submitNote() {
                if (this.note === '') {
                    return;
                }

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
            setTheme(i, theme) {
                this.notes[i].theme = theme;
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
        height: calc(100vh - 90px);
        overflow-y: auto;

        h2 {
            margin: 0 0 20px;
            font-size: 20px;
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
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        .card-container {
            width: 240px;
            margin: 0 15px 30px;
        }

        .card {
            padding-top: 40px;
            padding-bottom: 30px;
            border: none;
            border-radius: 0;
            min-height: 200px;
            width: 100%;

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
                left: 0;
                width: 100%;
                padding: 0 10px;

                .card-action-dropdown {
                    display: inline-block;

                    button.btn {
                        padding: 0;
                    }

                    .dropdown-item {
                        display: flex;
                        align-items: center;
                        line-height: 20px;
                        padding: 5px 15px;
                    }
                }

                .card-action {
                    font-size: 20px;
                    color: #000;
                    display: inline-block;
                    margin: 0 5px;
                    text-decoration: none;
                    opacity: 0.4;
                    transform: scale(0.8);
                    transition: all 0.2s;

                    &:hover {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }

            .card-theme-preview {
                display: inline-block;
                margin-right: 8px;
                width: 20px;
                height: 20px;
            }
        }

        .pastel-red {
            background: #FFB3BA;
        }
        .pastel-orange {
            background: #FFDFBA;
        }
        .pastel-yellow {
            background: #FFFFBA;
        }
        .pastel-green {
            background: #BAFFC9;
        }
        .pastel-blue {
            background: #BAE1FF;
        }
    }

    .swoopIn-enter-active, .swoopIn-leave-active {
        transition: all 0.5s;
    }

    .swoopIn-enter, .swoopIn-leave-to {
        transform: scale(1.2);
        opacity: 0;
    }
</style>
