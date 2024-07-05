import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("Normal");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { title: newTask, date: selectedDate, priority }]);
      setNewTask("");
      setSelectedDate(null);
      setPriority("Normal");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
      </header>
      <div className="mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="mb-2"
        />
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Set Due Date</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Due Date</DialogTitle>
              </DialogHeader>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </DialogContent>
          </Dialog>
          <Select onValueChange={setPriority} value={priority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addTask}>Add Task</Button>
        </div>
      </div>
      <div>
        {tasks.map((task, index) => (
          <Card key={index} className="mb-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Checkbox />
                <span>{task.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <span>{task.date ? format(task.date, "PPP") : "No due date"}</span>
                <span>{task.priority}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;