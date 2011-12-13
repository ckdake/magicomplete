jQuery ->

  
  $.widget( "custom.magicomplete", {
    options: {
      data: []
      selected: []
    }
    _create: ->
      console.log(@.options.selected)
      @.element.append '<ul></ul>'
      @.element.find('ul').append '<li><input class="search" placeholder="Atlanta"><br /><span>search</span></li>'
      @.refresh()
      widget = @
      $('.magicomplete ul li a.close').live('click', (e) ->
        for i in [0..(widget.options.selected.length - 1)]
          if widget.options.selected[i].category == $(e.currentTarget).parent().data().category && widget.options.selected[i].label == $(e.currentTarget).parent().data().label
            widget.options.selected.splice(i, 1)
            $(e.currentTarget).parent().remove()
            return false
      )
      @.element.find('input.search').autocomplete({
        delay: 0,
        source: widget.options.data,
        select: (event, ui) ->
          widget.options.selected.push { label: ui.item.label, category: ui.item.category }
          widget.refresh()
          false
      }).data("autocomplete")._renderMenu = (ul, items) ->
        self = this
        currentCategory = ""
        $.each items, (index, item) ->
          unless item.category is currentCategory
            ul.append "<li class='ui-autocomplete-category'>" + item.category + "</li>"
            currentCategory = item.category
          self._renderItem ul, item
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
      