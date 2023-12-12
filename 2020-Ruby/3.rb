file_path = File.expand_path('day-03-input.txt', __dir__)
input     = File.read(file_path)

map = input.split("\n").map { |line| line.split('') }

def count_trees(right, down, map)
  x, y, trees = 0, 0, 0
  while y < map.length - 1
    x += right
    x %= map[0].length
    y += down

    trees += 1 if map[y][x] == '#'
  end
  return trees
end

combi = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
count = 1

combi.each do |comb|
  count *= count_trees(comb[0], comb[1], map)
end

p count
