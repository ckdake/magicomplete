
  jQuery(function() {
    return $.widget("custom.magicomplete", {
      options: {
        data: [],
        selected: []
      },
      _create: function() {
        var widget;
        this.element.append('<ul></ul>');
        this.element.find('ul').append('<li><input class="search" placeholder="Atlanta"><br /><span>search</span></li>');
        this.refresh();
        widget = this;
        $('.magicomplete ul li a.close').live('click', function(e) {
          var i, _ref;
          for (i = 0, _ref = widget.options.selected.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            if (widget.options.selected[i].category === $(e.currentTarget).parent().data().category && widget.options.selected[i].label === $(e.currentTarget).parent().data().label) {
              widget.options.selected.splice(i, 1);
              $(e.currentTarget).parent().remove();
              return false;
            }
          }
        });
        return this.element.find('input.search').autocomplete({
          delay: 0,
          source: widget.options.data,
          select: function(event, ui) {
            widget.options.selected.push({
              label: ui.item.label,
              category: ui.item.category
            });
            widget.refresh();
            return false;
          }
        }).data("autocomplete")._renderMenu = function(ul, items) {
          var currentCategory, self;
          self = this;
          currentCategory = "";
          return $.each(items, function(index, item) {
            if (item.category !== currentCategory) {
              ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
              currentCategory = item.category;
            }
            return self._renderItem(ul, item);
          });
        };
      },
      _value: function() {
        return 'bacon';
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
