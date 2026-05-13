"use client";

import React from "react";

import {
  Plus,
  Trash2,
  Rows3,
  Columns3,
  Table2,
} from "lucide-react";

import { Input, Button } from "@neuctra/ui";

/* =========================================
   TABLE EDITOR
========================================= */

const TableEditor = ({
  headers = [],
  rows = [],
  onChange,
}) => {
  /* =========================================
     UPDATE HEADER
  ========================================= */

  const updateHeader = (index, value) => {
    const updatedHeaders = [...headers];

    updatedHeaders[index] = value;

    onChange({
      headers: updatedHeaders,
      rows,
    });
  };

  /* =========================================
     UPDATE CELL
  ========================================= */

  const updateCell = (rowIndex, cellIndex, value) => {
    const updatedRows = [...rows];

    updatedRows[rowIndex][cellIndex] = value;

    onChange({
      headers,
      rows: updatedRows,
    });
  };

  /* =========================================
     ADD COLUMN
  ========================================= */

  const addColumn = () => {
    const updatedHeaders = [
      ...headers,
      `Column ${headers.length + 1}`,
    ];

    const updatedRows = rows.map((row) => [
      ...row,
      "",
    ]);

    onChange({
      headers: updatedHeaders,
      rows: updatedRows,
    });
  };

  /* =========================================
     REMOVE COLUMN
  ========================================= */

  const removeColumn = (index) => {
    if (headers.length <= 1) return;

    const updatedHeaders = headers.filter(
      (_, i) => i !== index,
    );

    const updatedRows = rows.map((row) =>
      row.filter((_, i) => i !== index),
    );

    onChange({
      headers: updatedHeaders,
      rows: updatedRows,
    });
  };

  /* =========================================
     ADD ROW
  ========================================= */

  const addRow = () => {
    const newRow = headers.map(() => "");

    onChange({
      headers,
      rows: [...rows, newRow],
    });
  };

  /* =========================================
     REMOVE ROW
  ========================================= */

  const removeRow = (index) => {
    if (rows.length <= 1) return;

    const updatedRows = rows.filter(
      (_, i) => i !== index,
    );

    onChange({
      headers,
      rows: updatedRows,
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          px-4
          py-3
          border-b
          border-white/10
          bg-white/[0.02]
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
            "
          >
            <Table2 size={18} className="text-white/70" />
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">
              Table Editor
            </h3>

            <p className="text-xs text-white/40">
              {rows.length} rows • {headers.length} columns
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={Columns3}
            onClick={addColumn}
          >
            Column
          </Button>

          <Button
            size="sm"
            variant="outline"
            leftIcon={Rows3}
            onClick={addRow}
          >
            Row
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          {/* HEADERS */}
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="
                    min-w-[220px]
                    border-b
                    border-r
                    border-white/10
                    bg-white/[0.02]
                    p-3
                    last:border-r-0
                  "
                >
                  <div className="flex items-center gap-2">
                    <Input
                      value={header}
                      onChange={(e) =>
                        updateHeader(index, e.target.value)
                      }
                      placeholder={`Column ${index + 1}`}
                      className="font-medium"
                    />

                    <button
                      type="button"
                      onClick={() => removeColumn(index)}
                      className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        text-white/40
                        hover:text-red-400
                        hover:bg-red-500/10
                        transition-all
                      "
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-white/10"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="
                      border-r
                      border-white/10
                      p-3
                      last:border-r-0
                    "
                  >
                    <Input
                      value={cell}
                      onChange={(e) =>
                        updateCell(
                          rowIndex,
                          cellIndex,
                          e.target.value,
                        )
                      }
                      placeholder="Cell value..."
                    />
                  </td>
                ))}

                {/* ROW DELETE */}
                <td className="w-[70px] p-3">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    className="
                      flex
                      items-center
                      justify-center
                      w-10
                      h-10
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-white/40
                      hover:text-red-400
                      hover:bg-red-500/10
                      transition-all
                    "
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div
        className="
          flex
          items-center
          justify-center
          gap-3
          p-4
          border-t
          border-white/10
          bg-white/[0.02]
        "
      >
        <Button
          variant="outline"
          leftIcon={Plus}
          onClick={addRow}
        >
          Add Row
        </Button>

        <Button
          variant="outline"
          leftIcon={Plus}
          onClick={addColumn}
        >
          Add Column
        </Button>
      </div>
    </div>
  );
};

export default TableEditor;