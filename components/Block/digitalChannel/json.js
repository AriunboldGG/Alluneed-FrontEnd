export const json = {
  title: "Таны тооцоолол",
  completedHtml:
    "<div style=\"background-color: #F8D3B4; padding: 20px; border-radius: 10px; font-family: 'Tahoma', sans-serif; font-size: 32px;\">\n    <p style=\"background-color: #F8D3B4; color: black; padding: 20px; border-radius: 10px; font-family: 'Tahoma', sans-serif; font-size: 22px;>Захиалга өгсөнд баярлалаа.</p>\n    <p style=\"background-color: #F8D3B4; color: black; padding: 20px; border-radius: 10px; font-family: 'Tahoma', sans-serif; font-size: 22px; >Захиалга өгсөнд баярлалаа.Бид таньтай эргээд холбогдох болно.</p>\n</div>\n",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "matrixdynamic",
          name: "coffeeOrderTable",
          title: "Хүссэн үйлчилгээгээ сонгоно уу",
          description:
            "Таны сонгосон үйлчилгээнд тохируулж үнийн дүн өөр өөр бодогдох юм",
          validators: [
            {
              type: "expression",
            },
          ],
          columns: [
            {
              name: "coffee",
              title: "Реклам",
              cellType: "dropdown",
              isRequired: true,
              isUnique: true,
              choices: [
                {
                  value: "espresso",
                  text: "Video Reel",
                },
                {
                  value: "ristretto",
                  text: "Instagramm Post",
                },
                {
                  value: "macchiato",
                  text: "Instagramm story",
                },
                {
                  value: "fbpost",
                  text: "FACEBOOK Post",
                },
              ],
            },
            {
              name: "price",
              title: "Үнэ",
              cellType: "expression",
              expression:
                "iif({row.coffee} = 'ristretto' or {row.coffee} = 'macchiato' or {row.coffee} = 'cappuchino', '2.5', iif({row.coffee} = 'flatWhite' or {row.coffee} = 'latte', 3, 2))\n",
            },
            {
              name: "amount",
              title: "Тоо",
              cellType: "dropdown",
              isRequired: true,
              totalExpression:
                "'Total: ' + sumInArray({coffeeOrderTable}, 'amount')",
              choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            },
            {
              name: "totalPerRow",
              title: "Нийт",
              cellType: "expression",
              totalType: "sum",
              totalFormat: "Дүн: {0}",
              totalDisplayStyle: "currency",
              expression: "{row.price} * {row.amount}",
            },
          ],
          rowCount: 1,
          maxRowCount: 6,
          defaultRowValue: {
            coffeeItem: "2",
            coffee: "espresso",
            price: 2,
            amount: 1,
            totalPerRow: 2,
          },
          addRowLocation: "bottom",
          addRowText: "Үйлчилгээ нэмэх",
        },
        {
          type: "panel",
          name: "panel1",
          elements: [
            {
              type: "text",
              name: "taxRate",
              title: "Хөнгөлөлт (in %)",
              defaultValue: 10,
              inputType: "number",
              min: 0,
              max: 20,
            },
            {
              type: "expression",
              name: "taxAmount",
              startWithNewLine: false,
              title: "Хөнгөлөлт дүн",
              expression:
                "{coffeeOrderTable-total.totalPerRow} * {taxRate} / 100",
              displayStyle: "currency",
            },
            {
              type: "expression",
              name: "total",
              startWithNewLine: false,
              title: "Нийт",
              expression: "{coffeeOrderTable-total.totalPerRow} + {taxAmount}",
              displayStyle: "currency",
            },
          ],
          title: "Нэмэлт үйлчилгээ",
        },
      ],
    },
  ],
  showQuestionNumbers: "off",
  questionErrorLocation: "bottom",
  completeText: "Захиалга өгөх",
  headerView: "advanced",
};
