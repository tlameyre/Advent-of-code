a = ['L.LL.LL.LL',
     'LLLLLLL.LL',
     'L.L.L..L..',
     'LLLL.LL.LL',
     'L.LL.LL.LL',
     'L.LLLLL.LL',
     '..L.L.....',
     'LLLLLLLLLL',
     'L.LLLLLL.L',
     'L.LLLLL.LL']
a = a.map do |expr|
    expr = expr.split('')
  end


rows = a[0].size
cols = a.size
changed = true
new_plan = []

occupied_plan = []

i = 0

3.times do
  i += 1
  new_plan = []
  occupied_plan = []
  cloned_plan = a.clone

  a.each_with_index do |row, row_index|
    new_row = []
    new_occupied_row = []
    row.each_with_index do |col, col_index|
      occupied = 0
      # p row
      # p col
      if row_index.positive? && a[row_index - 1][col_index] == '#' #pas sur la premiere ligne
        occupied += 1
        if col_index.positive? && a[row_index - 1][col_index - 1] == '#' #pas dans la premiere colonne
          occupied += 1
        end
        if col_index < cols && a[row_index - 1][col_index + 1] == '#'
          occupied += 1
        end
      end
      if row_index < rows - 1 && a[row_index + 1][col_index] == '#'
        occupied += 1
        if col_index.positive? && a[row_index + 1][col_index - 1] == '#' #pas dans la premiere colonne
          occupied += 1
        end
        if col_index < cols && a[row_index + 1][col_index + 1] == '#'
          occupied += 1
        end
      end
      if col_index.positive? && a[row_index][col_index - 1] == '#'
        occupied += 1
      end
      if col_index < cols - 1 && a[row_index][col_index + 1] == '#'
        occupied += 1
      end

      if col == 'L' && occupied == 0
        cloned_plan[row_index][col_index] = '#'
      end

      if col == '#' && occupied >= 4
        cloned_plan[row_index][col_index] = 'L'
      end
      new_row << cloned_plan[row_index][col_index]
      new_occupied_row << occupied
    end
    new_plan << new_row
    occupied_plan << new_occupied_row
  end
  print "Tour",i
  p ""
  p "A"
  p cloned_plan
  p "New Plan"
  p new_plan
  p occupied_plan

  a = cloned_plan
end
