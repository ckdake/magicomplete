jQuery ->
  $.widget( "custom.magicomplete", {
    options: {
      data: []
      selected: []
    }
    _create: ->
      @.element.append('<ul><li><input class="search" placeholder="Atlanta"><br /><span>search</span></li></ul>')
      @.refresh()
      $('.magicomplete ul li a.close').live('click', (e) =>
        $.each @options.selected, (index, item) =>
          if item.category == $(e.currentTarget).parent().data().category && item.label == $(e.currentTarget).parent().data().label
            @options.selected.splice(index, 1)
            $(e.currentTarget).parent().remove()
            false
      )
      @.element.find('input.search').autocomplete({
        delay: 0,
        source: @options.data,
        select: (event, ui) =>
          @options.selected.push { label: ui.item.label, category: ui.item.category }
          @refresh()
          false
      }).data("autocomplete")._renderMenu = (ul, items) ->
        current_category = ""
        $.each items, (index, item) =>
          unless item.category is current_category
            ul.append "<li class='ui-autocomplete-category'>" + item.category + "</li>"
            currentCategory = item.category
          @._renderItem ul, item
    value: ->
      @options.selected
    destroy: ->
      @empty()
    refresh: ->
      obj = @.element.find('ul')
      obj.children().remove('.entry')
      for item in @options.selected.reverse()
          do (item) ->
            obj.prepend '<li class="entry" data-label="'+item.label+'" data-category="'+item.category+'">' + item.label + '<a href="#" close="close" class="close">&times;</a><br/><span class="category">' + item.category + '</span></li>'
      @options.selected.reverse()
  })
      