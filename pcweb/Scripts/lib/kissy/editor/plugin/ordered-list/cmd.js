﻿/*=======================cmd.js===========================*/
/*
Copyright 2012, KISSY UI Library v1.40dev
MIT Licensed
build time: Aug 27 10:38
*/
/**
 * orderedList command
 * @author yiminghe@gmail.com
 */
KISSY.add("editor/plugin/ordered-list/cmd", function (S, Editor, listCmd) {

    var insertOrderedList = "insertOrderedList",
        ListCommand = listCmd.ListCommand,
        queryActive = listCmd.queryActive,
        olCmd = new ListCommand("ol");

    return {
        init:function (editor) {
            if (!editor.hasCommand(insertOrderedList)) {
                editor.addCommand(insertOrderedList, {
                    exec:function (editor) {
                        editor.focus();
                        olCmd.exec(editor);
                    }
                });
            }

            var queryOl = Editor.Utils.getQueryCmd(insertOrderedList);

            if (!editor.hasCommand(queryOl)) {
                editor.addCommand(queryOl, {
                    exec:function (editor) {
                        var selection = editor.getSelection();
                        if (selection && !selection.isInvalid) {
                            var startElement = selection.getStartElement();
                            var elementPath = new Editor.ElementPath(startElement);
                            return queryActive("ol", elementPath);
                        }
                    }
                });
            }
        }
    };

}, {
    requires:['editor', '../list-utils/cmd']
});

