import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

interface Position {
  x: number;
  y: number;
}

interface GameState {
  rocketPos: Position;
  rocketDirection: number; // 0: up, 1: right, 2: down, 3: left
  targetPos: Position;
  gameWon: boolean;
  isRunning: boolean;
}

const GRID_SIZE = 6;
const DIRECTIONS = [
  { x: 0, y: -1 }, // up
  { x: 1, y: 0 },  // right
  { x: 0, y: 1 },  // down
  { x: -1, y: 0 }  // left
];

const DIRECTION_EMOJIS = ['⬆️', '➡️', '⬇️', '⬅️'];

const CodingGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    rocketPos: { x: 0, y: 5 },
    rocketDirection: 0,
    targetPos: { x: 5, y: 0 },
    gameWon: false,
    isRunning: false
  });

  const [code, setCode] = useState(`// Hướng dẫn rocket đến ngôi sao!
// Sử dụng các lệnh sau:
// move() - di chuyển về phía trước
// turnRight() - xoay phải
// turnLeft() - xoay trái
// repeat(n, [lệnh1, lệnh2]) - lặp lại n lần

move();
turnRight();
move();`);

  const [executionLog, setExecutionLog] = useState<string[]>([]);

  const resetGame = useCallback(() => {
    setGameState({
      rocketPos: { x: 0, y: 5 },
      rocketDirection: 0,
      targetPos: { x: 5, y: 0 },
      gameWon: false,
      isRunning: false
    });
    setExecutionLog([]);
  }, []);

  const isValidPosition = (pos: Position) => {
    return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE;
  };

  const executeCommands = useCallback(async () => {
    if (gameState.isRunning) return;

    setGameState(prev => ({ ...prev, isRunning: true }));
    setExecutionLog([]);

    let currentState = {
      rocketPos: { x: 0, y: 5 },
      rocketDirection: 0
    };

    const log: string[] = [];

    const move = () => {
      const direction = DIRECTIONS[currentState.rocketDirection];
      const newPos = {
        x: currentState.rocketPos.x + direction.x,
        y: currentState.rocketPos.y + direction.y
      };

      if (isValidPosition(newPos)) {
        currentState.rocketPos = newPos;
        log.push(`Rocket di chuyển đến (${newPos.x}, ${newPos.y})`);
        return true;
      } else {
        log.push(`❌ Không thể di chuyển ra ngoài lưới!`);
        return false;
      }
    };

    const turnRight = () => {
      currentState.rocketDirection = (currentState.rocketDirection + 1) % 4;
      log.push(`Rocket xoay phải ${DIRECTION_EMOJIS[currentState.rocketDirection]}`);
    };

    const turnLeft = () => {
      currentState.rocketDirection = (currentState.rocketDirection + 3) % 4;
      log.push(`Rocket xoay trái ${DIRECTION_EMOJIS[currentState.rocketDirection]}`);
    };

    const repeat = (times: number, commands: (() => boolean | void)[]) => {
      for (let i = 0; i < times; i++) {
        for (const command of commands) {
          const result = command();
          if (result === false) return false;
        }
      }
      return true;
    };

    try {
      // Simple parser for basic commands
      const lines = code.split('\n').filter(line => 
        line.trim() && !line.trim().startsWith('//')
      );

      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine === 'move();') {
          if (!move()) break;
        } else if (trimmedLine === 'turnRight();') {
          turnRight();
        } else if (trimmedLine === 'turnLeft();') {
          turnLeft();
        } else if (trimmedLine.startsWith('repeat(')) {
          // Simple repeat parser for basic cases
          const match = trimmedLine.match(/repeat\((\d+),\s*\[(.*?)\]\);/);
          if (match) {
            const times = parseInt(match[1]);
            const commandsStr = match[2];
            const commands = commandsStr.split(',').map(cmd => cmd.trim().replace(/['"]/g, ''));
            
            const commandFunctions: (() => boolean | void)[] = [];
            for (const cmd of commands) {
              if (cmd === 'move()') commandFunctions.push(move);
              else if (cmd === 'turnRight()') commandFunctions.push(turnRight);
              else if (cmd === 'turnLeft()') commandFunctions.push(turnLeft);
            }
            
            if (!repeat(times, commandFunctions)) break;
          }
        }

        // Update UI with animation delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setGameState(prev => ({
          ...prev,
          rocketPos: { ...currentState.rocketPos },
          rocketDirection: currentState.rocketDirection
        }));
      }

      setExecutionLog(log);

      // Check win condition
      if (currentState.rocketPos.x === gameState.targetPos.x && 
          currentState.rocketPos.y === gameState.targetPos.y) {
        setGameState(prev => ({ ...prev, gameWon: true }));
        toast.success("🎉 Chúc mừng! Rocket đã đến được ngôi sao!");
      } else {
        toast.info("Thử lại! Rocket chưa đến được ngôi sao.");
      }

    } catch (error) {
      toast.error("Có lỗi trong code của bạn. Hãy kiểm tra lại!");
      log.push(`❌ Lỗi: ${error}`);
      setExecutionLog(log);
    }

    setGameState(prev => ({ ...prev, isRunning: false }));
  }, [code, gameState.targetPos, gameState.isRunning]);

  return (
    <div className="space-y-6">
      <Card className="shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            🚀 Thử thách lập trình 
            <Badge variant="secondary">Tương tác</Badge>
          </CardTitle>
          <CardDescription>
            Hướng dẫn rocket đến ngôi sao bằng code! Học loops, điều kiện và biến một cách vui nhộn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Game Board */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="text-primary" size={20} />
                Bảng game
              </h3>
              <div className="grid grid-cols-6 gap-1 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                  const x = index % GRID_SIZE;
                  const y = Math.floor(index / GRID_SIZE);
                  
                  const isRocket = gameState.rocketPos.x === x && gameState.rocketPos.y === y;
                  const isTarget = gameState.targetPos.x === x && gameState.targetPos.y === y;
                  
                  return (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-2xl rounded border-2 transition-all duration-300 ${
                        isRocket 
                          ? 'bg-blue-200 dark:bg-blue-800 border-blue-400 scale-110' 
                          : isTarget 
                          ? 'bg-yellow-200 dark:bg-yellow-800 border-yellow-400' 
                          : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isRocket && (
                        <span className="animate-bounce">
                          {DIRECTION_EMOJIS[gameState.rocketDirection]}
                        </span>
                      )}
                      {isTarget && <span className="animate-pulse">⭐</span>}
                      {!isRocket && !isTarget && (
                        <span className="text-xs text-slate-400">
                          {x},{y}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {gameState.gameWon && (
                <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-lg animate-bounce">
                  <div className="text-2xl">🎉 Thành công!</div>
                  <p className="text-green-700 dark:text-green-300">
                    Rocket đã đến được ngôi sao!
                  </p>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">💻 Viết code của bạn</h3>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Nhập code của bạn ở đây..."
                className="min-h-[200px] font-mono text-sm"
                disabled={gameState.isRunning}
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={executeCommands}
                  disabled={gameState.isRunning}
                  className="flex-1"
                  variant="default"
                >
                  <Play size={16} className="mr-2" />
                  {gameState.isRunning ? 'Đang chạy...' : 'Chạy Code'}
                </Button>
                <Button onClick={resetGame} variant="outline">
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
              </div>

              {executionLog.length > 0 && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 space-y-1">
                  <h4 className="font-semibold text-sm">📋 Nhật ký thực thi:</h4>
                  {executionLog.map((log, index) => (
                    <div key={index} className="text-sm text-slate-600 dark:text-slate-400">
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Gợi ý:</h4>
            <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
              <li>• Sử dụng <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">move()</code> để di chuyển về phía trước</li>
              <li>• Sử dụng <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">turnRight()</code> và <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">turnLeft()</code> để xoay</li>
              <li>• Thử <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">repeat(3, ["move()"])</code> để lặp lại lệnh</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodingGame;