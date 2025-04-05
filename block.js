(function (blocks, blockEditor, element, components) {
  var el = element.createElement;
  var RichText = blockEditor.RichText;
  var MediaUpload = blockEditor.MediaUpload;
  var InspectorControls = blockEditor.InspectorControls;
  var ColorPalette = components.ColorPalette;
  var Button = components.Button;
  var PanelBody = components.PanelBody;
  var RangeControl = components.RangeControl;
  var useState = element.useState;

  blocks.registerBlockType("custom/items-block", {
    title: "Accordion Items Block",
    icon: "media-default",
    category: "widgets",
    attributes: {
      items: {
        type: "array",
        default: [],
      },
      headerColor: {
        type: "string",
        default: "#333333",
      },
      descriptionColor: {
        type: "string",
        default: "#555555",
      },
      backgroundColor: {
        type: "string",
        default: "#ffffff",
      },
      cardBackgroundColor: {
        type: "string",
        default: "#f9f9f9",
      },
      columns: {
        type: "number",
        default: 3,
      },
      spacing: {
        type: "number",
        default: 10,
      },
      padding: {
        type: "number",
        default: 15,
      },
      margin: {
        type: "number",
        default: 10,
      },
      imageWidth: {
        type: "number",
        default: 100, // Default width in percentage
      },
    },
    edit: function (props) {
      var attributes = props.attributes;
      var items = attributes.items;
      var setAttributes = props.setAttributes;

      // Destructure attributes
      var headerColor = attributes.headerColor;
      var descriptionColor = attributes.descriptionColor;
      var backgroundColor = attributes.backgroundColor;
      var cardBackgroundColor = attributes.cardBackgroundColor;
      var columns = attributes.columns;
      var spacing = attributes.spacing;
      var padding = attributes.padding;
      var margin = attributes.margin;
      var imageWidth = attributes.imageWidth;

      function addItem() {
        var newItems = items.concat([
          {
            title: "Enter title...",
            imageURL: "",
            description: "Enter description...",
          },
        ]);
        setAttributes({ items: newItems });
      }

      function updateItem(index, field, value) {
        var newItems = items.map(function (item, i) {
          return i === index
            ? Object.assign({}, item, { [field]: value })
            : item;
        });
        setAttributes({ items: newItems });
      }

      return el(
        "div",
        {
          className: props.className,
          style: { backgroundColor: backgroundColor },
        },
        el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: "Colors", initialOpen: true },
            el(
              "div",
              null,
              el("p", { style: { marginBottom: "8px" } }, "Header Color"),
              el(ColorPalette, {
                value: headerColor,
                onChange: function (color) {
                  setAttributes({ headerColor: color });
                },
              })
            ),
            el(
              "div",
              null,
              el("p", { style: { marginBottom: "8px" } }, "Description Color"),
              el(ColorPalette, {
                value: descriptionColor,
                onChange: function (color) {
                  setAttributes({ descriptionColor: color });
                },
              })
            ),
            el(
              "div",
              null,
              el("p", { style: { marginBottom: "8px" } }, "Background Color"),
              el(ColorPalette, {
                value: backgroundColor,
                onChange: function (color) {
                  setAttributes({ backgroundColor: color });
                },
              })
            ),
            el(
              "div",
              null,
              el(
                "p",
                { style: { marginBottom: "8px" } },
                "Card Background Color"
              ),
              el(ColorPalette, {
                value: cardBackgroundColor,
                onChange: function (color) {
                  setAttributes({ cardBackgroundColor: color });
                },
              })
            )
          ),
          el(
            PanelBody,
            { title: "Layout", initialOpen: true },
            el(RangeControl, {
              label: "Columns",
              value: columns,
              onChange: function (value) {
                setAttributes({ columns: value });
              },
              min: 1,
              max: 4,
            }),
            el(RangeControl, {
              label: "Spacing",
              value: spacing,
              onChange: function (value) {
                setAttributes({ spacing: value });
              },
              min: 0,
              max: 20,
            }),
            el(RangeControl, {
              label: "Padding",
              value: padding,
              onChange: function (value) {
                setAttributes({ padding: value });
              },
              min: 0,
              max: 20,
            }),
            el(RangeControl, {
              label: "Margin",
              value: margin,
              onChange: function (value) {
                setAttributes({ margin: value });
              },
              min: 0,
              max: 20,
            }),
            el(RangeControl, {
              label: "Image Width (%)",
              value: imageWidth,
              onChange: function (value) {
                setAttributes({ imageWidth: value });
              },
              min: 10,
              max: 100,
            })
          )
        ),

        el(
          "div",
          {
            className: "custom-items-grid",
            style: { gridTemplateColumns: `repeat(${columns}, 1fr)` },
          },
          items.map(function (item, index) {
            return el(
              "div",
              {
                key: index,
                className: "custom-item",
                style: {
                  backgroundColor: cardBackgroundColor,
                },
              },
              el(
                "div",
                {
                  className: "custom-item-header",
                  style: { color: headerColor },
                },
                el(RichText, {
                  tagName: "h3",
                  value: item.title,
                  onChange: function (value) {
                    updateItem(index, "title", value);
                  },
                  placeholder: "Item title...",
                  style: { margin: 0 },
                }),
                el(MediaUpload, {
                  onSelect: function (media) {
                    updateItem(index, "imageURL", media.url);
                  },
                  allowedTypes: ["image"],
                  render: function (obj) {
                    return el(
                      Button,
                      {
                        onClick: obj.open,
                        isSecondary: true,
                        style: { marginLeft: "10px" },
                      },
                      item.imageURL ? "Change Image" : "Upload Image"
                    );
                  },
                }),
                item.imageURL &&
                  el("img", {
                    src: item.imageURL,
                    alt: "Item image",
                    className: "custom-item-image",
                    style: {
                      width: imageWidth + "%",
                      height: "auto",
                      marginTop: "10px",
                    },
                  })
              ),
              // Always show description input in editor
              el(
                "div",
                {
                  className: "custom-item-description",
                  style: {
                    color: descriptionColor,
                    padding: "10px 0",
                  },
                },
                el(RichText, {
                  tagName: "p",
                  value: item.description,
                  onChange: function (value) {
                    updateItem(index, "description", value);
                  },
                  placeholder: "Item description...",
                })
              )
            );
          })
        ),
        el(
          Button,
          {
            isPrimary: true,
            onClick: addItem,
            style: { marginTop: "20px" },
          },
          "Add New Item"
        )
      );
    },
    save: function (props) {
      var attributes = props.attributes;
      var items = attributes.items;

      return el(
        "div",
        {
          className: "custom-items-block",
          style: { backgroundColor: attributes.backgroundColor },
        },
        el(
          "div",
          {
            className: "custom-items-grid",
            style: {
              gridTemplateColumns: `repeat(${attributes.columns}, 1fr)`,
              gridGap: attributes.spacing + "px",
            },
          },
          items.map(function (item, index) {
            return el(
              "div",
              {
                key: index,
                className: "custom-item",
                style: {
                  backgroundColor: attributes.cardBackgroundColor,
                  margin: attributes.margin + "px",
                  padding: attributes.padding + "px",
                  gridGap: attributes.spacing + "px",
                },
              },
              el(
                "div",
                {
                  className: "custom-item-header",
                  style: { color: attributes.headerColor },
                },
                el("h3", null, item.title),
                item.imageURL &&
                  el("img", {
                    src: item.imageURL,
                    alt: item.title,
                    className: "custom-item-image",
                    style: { width: attributes.imageWidth + "%" },
                  })
              ),
              el(
                "div",
                {
                  className: "custom-item-description",
                  style: { color: attributes.descriptionColor },
                },
                el("p", null, item.description)
              )
            );
          })
        )
      );
    },
  });
})(
  window.wp.blocks,
  window.wp.blockEditor || window.wp.editor,
  window.wp.element,
  window.wp.components
);
