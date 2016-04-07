/* jshint browser: true, esnext: true */

(function () {

    'use strict';

    // RFC-5646 = ISO 639-1 & ISO 15924, this is the fundament for spoken_language and states
    const written_language = {
        "en": {
            "en": "English",
            "zh-Hans": "英语",
            "zh-Hant": "英語"
        },
        "zh-Hans": {
            "en": "Simplified Chinese",
            "zh-Hans": "简体中文",
            "zh-Hant": "簡體中文"
        },
        "zh-Hant": {
            "en": "Traditional Chinese",
            "zh-Hans": "繁体中文",
            "zh-Hant": "繁體中文"
        }
    };

    // RFC-5646 = ISO 639-1 & ISO 15924
    const spoken_language = {
        "en": {
            "en": "English",
            "zh-Hans": "英语",
            "zh-Hant": "英語"
        },
        "zh-cmn": {
            "en": "Mandarin",
            "zh-Hans": "普通话",
            "zh-Hant": "普通話"
        },
        "zh-yue": {
            "en": "Cantonese",
            "zh-Hans": "粤语",
            "zh-Hant": "粵語"
        }
    };

    const states = {
        "AL": {
            name: {
                "en": "Alabama",
                "zh-Hans": "阿拉巴马",
                "zh-Hant": "阿拉巴馬"
            }
        },
        "AK": {
            name: {
                "en": "Alaska",
                "zh-Hans": "阿拉斯加",
                "zh-Hant": "阿拉斯加"
            }
        },
        "AZ": {
            name: {
                "en": "Arizona",
                "zh-Hans": "亚利桑那",
                "zh-Hant": "亞利桑那"
            }
        }
    };

    window.Const = {};
    window.Const.Language = {};
    window.Const.Language.Spoken = spoken_language;
    window.Const.Language.Written = written_language;
    window.Const.States = states;

}());