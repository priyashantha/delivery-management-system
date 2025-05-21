<?php

namespace Tests\Unit;

use App\Models\Task;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TaskModelTest extends TestCase
{
    #[Test]
    public function it_can_create_a_task_instance()
    {
        $task = new Task([
            'title' => 'Coverage Title',
            'content' => 'Coverage Content',
        ]);

        $this->assertEquals('Coverage Title', $task->title);
        $this->assertFalse($task->completed);
    }

    #[Test]
    public function it_has_expected_fillable_fields()
    {
        $model = new Task();
        $this->assertEquals(['title', 'content', 'completed'], $model->getFillable());
    }
}
