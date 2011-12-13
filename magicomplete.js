
  jQuery(function() {
    return $.widget("custom.magicomplete", {
      options: {
        data: [],
        selected: []
      },
      _create: function() {
        var _this = this;
        this.element.append('<ul><li><input class="search" placeholder="Atlanta"><br /><span>search</span></li></ul>');
        this.refresh();
        $('.magicomplete ul li a.close').live('click', function(e) {
          return $.each(_this.options.selected, function(index, item) {
            if (item.category === $(e.currentTarget).parent().data().category && item.label === $(e.currentTarget).parent().data().label) {
              _this.options.selected.splice(index, 1);
              $(e.currentTarget).parent().remove();
              return false;
            }
          });
        });
        return this.element.find('input.search').autocomplete({
          delay: 0,
          source: this.options.data,
          select: function(event, ui) {
            _this.options.selected.push({
              label: ui.item.label,
              category: ui.item.category
            });
            _this.refresh();
            return false;
          }
        }).data("autocomplete")._renderMenu = function(ul, items) {
          var current_category;
          var _this = this;
          current_category = "";
          return $.each(items, function(index, item) {
            var currentCategory;
            if (item.category !== current_category) {
              ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
              currentCategory = item.category;
            }
            return _this._renderItem(ul, item);
          });
        };
      },
      value: function() {
        return this.options.selected;
      },
      destroy: function() {
        return this.empty();
      },
      refresh: function() {
        var item, obj, _fn, _i, _len, _ref;
        obj = this.element.find('ul');
        obj.children().remove('.entry');
        _ref = this.options.selected.reverse();
        _fn = function(item) {
          return obj.prepend('<li class="entry" data-label="' + item.label + '" data-category="' + item.category + '">' + item.label + '<a href="#" close="close" class="close">&times;</a><br/><span class="category">' + item.category + '</span></li>');
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _fn(item);
        }
        return this.options.selected.reverse();
      }
    });
  });
