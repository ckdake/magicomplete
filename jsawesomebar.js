
  jQuery(function() {
    var display_magicomplete_bar;
    $('.magicomplete ul li a.close').live('click', function(e) {
      var i, _ref;
      for (i = 0, _ref = magicomplete_selected.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (magicomplete_selected[i].category === $(e.currentTarget).parent().data().category && magicomplete_selected[i].label === $(e.currentTarget).parent().data().label) {
          magicomplete_selected.splice(i, 1);
          $(e.currentTarget).parent().remove();
          return false;
        }
      }
    });
    display_magicomplete_bar = function(obj) {
      var item, _fn, _i, _len, _ref;
      obj.children().remove('.entry');
      _ref = magicomplete_selected.reverse();
      _fn = function(item) {
        return obj.prepend('<li class="entry" data-label="' + item.label + '" data-category="' + item.category + '">' + item.label + '<a href="#" close="close" class="close">&times;</a><br/><span class="category">' + item.category + '</span></li>');
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _fn(item);
      }
      return magicomplete_selected.reverse();
    };
    $.widget("custom.magicomplete", $.ui.autocomplete, {
      _init: function() {
        return display_magicomplete_bar($('.magicomplete ul'));
      },
      _renderMenu: function(ul, items) {
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
      }
    });
    return $('.magicomplete input.search').magicomplete({
      delay: 0,
      source: data,
      select: function(event, ui) {
        magicomplete_selected.push({
          label: ui.item.label,
          category: ui.item.category
        });
        display_magicomplete_bar($('.magicomplete ul'));
        return false;
      }
    });
  });
